
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus, Search, UserX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewUserDialog from "@/components/users/NewUserDialog";

const Users = () => {
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock user data - in a real app, this would come from Supabase
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Staff", status: "Active" },
    { id: 3, name: "Guest User", email: "guest@example.com", role: "Guest", status: "Active" },
  ]);

  const handleCreateUser = (newUser) => {
    // In a real app, you would save to Supabase here
    setUsers([...users, { id: users.length + 1, ...newUser, status: "Active" }]);
    setIsNewUserDialogOpen(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
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
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <UserX className="h-4 w-4 mr-1" />
                            Deactivate
                          </Button>
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
