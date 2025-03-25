
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus, Search, UserX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewUserDialog from "@/components/users/NewUserDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Users = () => {
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        throw error;
      }

      // If no profiles exist yet, show the auth users
      if (!data || data.length === 0) {
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
        
        if (authError) {
          throw authError;
        }
        
        // Map auth users to the same format as our profiles would have
        const mappedUsers = authUsers?.users?.map(user => ({
          id: user.id,
          name: user.email?.split('@')[0] || 'Unknown',
          email: user.email,
          role: 'Guest', // Default role for now
          status: user.banned ? 'Inactive' : 'Active'
        })) || [];

        setUsers(mappedUsers);
      } else {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (newUser) => {
    try {
      // Create user in Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        email_confirm: true,
        user_metadata: {
          full_name: newUser.name,
          role: newUser.role
        }
      });

      if (error) {
        throw error;
      }

      // Add the new user to our users state
      const createdUser = {
        id: data.user.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: 'Active'
      };
      
      setUsers([...users, createdUser]);
      setIsNewUserDialogOpen(false);
      toast.success("User created successfully");
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Failed to create user');
    }
  };

  const handleDeactivateUser = async (userId) => {
    try {
      // Update the user in Supabase Auth
      const { error } = await supabase.auth.admin.updateUserById(
        userId,
        { banned: true }
      );

      if (error) {
        throw error;
      }

      // Update the local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, status: 'Inactive' } 
          : user
      ));
      
      toast.success("User deactivated successfully");
    } catch (error) {
      console.error('Error deactivating user:', error);
      toast.error('Failed to deactivate user');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout title="Users">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsNewUserDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Loading users...
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 text-muted-foreground">
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs 
                              ${user.role === "Admin" ? "bg-blue-100 text-blue-800" : 
                                user.role === "Staff" ? "bg-green-100 text-green-800" : 
                                "bg-orange-100 text-orange-800"}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs 
                              ${user.status === "Active" ? "bg-green-100 text-green-800" : 
                              "bg-red-100 text-red-800"}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            {user.status === "Active" && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500"
                                onClick={() => handleDeactivateUser(user.id)}
                              >
                                <UserX className="h-4 w-4 mr-1" />
                                Deactivate
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground">
                          No users found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <NewUserDialog
        open={isNewUserDialogOpen}
        onClose={() => setIsNewUserDialogOpen(false)}
        onCreateUser={handleCreateUser}
      />
    </AppLayout>
  );
};

export default Users;
