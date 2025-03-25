
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Filter,
  Ticket,
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  MessageSquare,
  MoreHorizontal,
  User
} from "lucide-react";
import { motion } from "framer-motion";

interface TicketType {
  id: number;
  title: string;
  description: string;
  status: "new" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  location: string;
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
}

const Tickets = () => {
  const tickets: TicketType[] = [
    {
      id: 1,
      title: "Broken shower in Room 203",
      description: "The shower in room 203 is leaking and needs immediate repair.",
      status: "new",
      priority: "high",
      category: "Maintenance",
      location: "Room 203",
      createdBy: "Maria Garcia",
      createdAt: "2023-07-03 09:15",
      updatedAt: "2023-07-03 09:15",
      comments: 2
    },
    {
      id: 2,
      title: "WiFi not working in common area",
      description: "Guests are reporting that the WiFi is not working in the common area.",
      status: "in-progress",
      priority: "medium",
      category: "IT",
      location: "Common Area",
      createdBy: "Ahmed Hassan",
      assignedTo: "Tech Support",
      createdAt: "2023-07-02 14:30",
      updatedAt: "2023-07-03 10:45",
      comments: 4
    },
    {
      id: 3,
      title: "AC repair in Room 105",
      description: "The air conditioning in room 105 is not cooling properly.",
      status: "resolved",
      priority: "medium",
      category: "Maintenance",
      location: "Room 105",
      createdBy: "John Smith",
      assignedTo: "Maintenance Team",
      createdAt: "2023-07-01 16:20",
      updatedAt: "2023-07-03 11:30",
      comments: 3
    },
    {
      id: 4,
      title: "Light bulb replacement in hallway",
      description: "Three light bulbs need replacing in the 2nd floor hallway.",
      status: "closed",
      priority: "low",
      category: "Maintenance",
      location: "2nd Floor Hallway",
      createdBy: "Staff",
      assignedTo: "Maintenance Team",
      createdAt: "2023-06-30 11:45",
      updatedAt: "2023-07-01 09:10",
      comments: 1
    },
    {
      id: 5,
      title: "Missing towels in Room 302",
      description: "Guest in room 302 has requested additional towels.",
      status: "resolved",
      priority: "low",
      category: "Housekeeping",
      location: "Room 302",
      createdBy: "Emma Wilson",
      assignedTo: "Housekeeping",
      createdAt: "2023-07-03 08:30",
      updatedAt: "2023-07-03 09:45",
      comments: 2
    },
    {
      id: 6,
      title: "TV not working in Room 201",
      description: "The TV in Room 201 isn't turning on. Guest has reported issue twice.",
      status: "in-progress",
      priority: "medium",
      category: "Electronics",
      location: "Room 201",
      createdBy: "Carlos Mendez",
      assignedTo: "Maintenance Team",
      createdAt: "2023-07-02 19:15",
      updatedAt: "2023-07-03 11:20",
      comments: 3
    },
    {
      id: 7,
      title: "Clogged toilet in Dorm 102",
      description: "Toilet in Dorm 102 is clogged and requires plumbing.",
      status: "new",
      priority: "high",
      category: "Plumbing",
      location: "Dorm 102",
      createdBy: "Sophie Chen",
      createdAt: "2023-07-03 11:10",
      updatedAt: "2023-07-03 11:10",
      comments: 0
    },
    {
      id: 8,
      title: "Kitchen refrigerator temperature issue",
      description: "The main kitchen refrigerator seems to be running too warm.",
      status: "new",
      priority: "medium",
      category: "Kitchen",
      location: "Main Kitchen",
      createdBy: "Kitchen Staff",
      createdAt: "2023-07-03 07:45",
      updatedAt: "2023-07-03 07:45",
      comments: 1
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-amber-100 text-amber-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Ticket size={14} />;
      case "in-progress":
        return <Clock size={14} />;
      case "resolved":
        return <CheckCircle size={14} />;
      case "closed":
        return <ClipboardList size={14} />;
      default:
        return <Ticket size={14} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle size={14} />;
      case "medium":
        return <Clock size={14} />;
      case "low":
        return <CheckCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Maintenance":
        return <span className="w-2 h-2 bg-blue-500 rounded-full"></span>;
      case "IT":
        return <span className="w-2 h-2 bg-purple-500 rounded-full"></span>;
      case "Housekeeping":
        return <span className="w-2 h-2 bg-green-500 rounded-full"></span>;
      case "Electronics":
        return <span className="w-2 h-2 bg-amber-500 rounded-full"></span>;
      case "Plumbing":
        return <span className="w-2 h-2 bg-red-500 rounded-full"></span>;
      case "Kitchen":
        return <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>;
      default:
        return <span className="w-2 h-2 bg-gray-500 rounded-full"></span>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <AppLayout title="Facility Tickets">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <Ticket size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Ticket Management</h2>
            <p className="text-muted-foreground">Manage facility maintenance and service requests</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search tickets..."
              className="pl-9 py-2 pr-4 rounded-lg bg-secondary h-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-[250px]"
            />
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Create Ticket</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Tickets</p>
                <p className="text-3xl font-bold mt-1">3</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Ticket size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold mt-1">2</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Clock size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-3xl font-bold mt-1">2</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Closed</p>
                <p className="text-3xl font-bold mt-1">1</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                <ClipboardList size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm">Ticket</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm">Status</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm">Priority</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm">Category</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm">Created</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm">Assigned To</th>
                      <th className="text-right p-4 font-medium text-muted-foreground text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <motion.tr
                        key={ticket.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-b hover:bg-muted/40 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{ticket.title}</span>
                            <span className="text-xs text-muted-foreground">{ticket.location}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(ticket.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(ticket.status)}
                              <span>{ticket.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
                            </div>
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            <div className="flex items-center gap-1">
                              {getPriorityIcon(ticket.priority)}
                              <span>{ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}</span>
                            </div>
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(ticket.category)}
                            <span>{ticket.category}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-muted-foreground" />
                            <span className="text-sm">{ticket.createdAt}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          {ticket.assignedTo ? (
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">{ticket.assignedTo.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{ticket.assignedTo}</span>
                            </div>
                          ) : (
                            <Badge variant="outline">Unassigned</Badge>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MessageSquare size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <User size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal size={16} />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View and manage all new tickets here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="in-progress">
          <Card>
            <CardHeader>
              <CardTitle>In Progress Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View and manage tickets currently being worked on.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View all resolved tickets here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Tickets;
