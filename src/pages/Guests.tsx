
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Filter,
  Users,
  UserPlus,
  Hotel,
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  checkIn: string;
  checkOut: string;
  room: string;
  bed: string;
  status: "checked-in" | "checked-out" | "reserved";
  avatar?: string;
}

const Guests = () => {
  const guests: Guest[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 123-456-7890",
      country: "United States",
      checkIn: "2023-07-01",
      checkOut: "2023-07-05",
      room: "Dorm 101",
      bed: "A",
      status: "checked-in"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "+34 612-345-678",
      country: "Spain",
      checkIn: "2023-07-02",
      checkOut: "2023-07-06",
      room: "Dorm 101",
      bed: "B",
      status: "checked-in"
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      phone: "+20 100-987-6543",
      country: "Egypt",
      checkIn: "2023-06-30",
      checkOut: "2023-07-07",
      room: "Dorm 101",
      bed: "C",
      status: "checked-in"
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      phone: "+44 7700-900-123",
      country: "United Kingdom",
      checkIn: "2023-07-03",
      checkOut: "2023-07-09",
      room: "Dorm 101",
      bed: "D",
      status: "checked-in"
    },
    {
      id: 5,
      name: "Carlos Mendez",
      email: "carlos.mendez@example.com",
      phone: "+52 55-1234-5678",
      country: "Mexico",
      checkIn: "2023-07-01",
      checkOut: "2023-07-08",
      room: "Dorm 101",
      bed: "E",
      status: "checked-in"
    },
    {
      id: 6,
      name: "Sophie Chen",
      email: "sophie.chen@example.com",
      phone: "+86 131-2345-6789",
      country: "China",
      checkIn: "2023-07-02",
      checkOut: "2023-07-06",
      room: "Dorm 102",
      bed: "A",
      status: "checked-in"
    },
    {
      id: 7,
      name: "Raj Patel",
      email: "raj.patel@example.com",
      phone: "+91 98765-43210",
      country: "India",
      checkIn: "2023-07-01",
      checkOut: "2023-07-05",
      room: "Dorm 102",
      bed: "B",
      status: "checked-in"
    },
    {
      id: 8,
      name: "Olivia Johnson",
      email: "olivia.johnson@example.com",
      phone: "+1 234-567-8901",
      country: "Canada",
      checkIn: "2023-07-03",
      checkOut: "2023-07-08",
      room: "Dorm 102",
      bed: "D",
      status: "checked-in"
    },
    {
      id: 9,
      name: "Luis Fernandez",
      email: "luis.fernandez@example.com",
      phone: "+54 11-2345-6789",
      country: "Argentina",
      checkIn: "2023-06-29",
      checkOut: "2023-07-04",
      room: "Dorm 102",
      bed: "E",
      status: "checked-in"
    },
    {
      id: 10,
      name: "Anna Schmidt",
      email: "anna.schmidt@example.com",
      phone: "+49 151-1234-5678",
      country: "Germany",
      checkIn: "2023-07-10",
      checkOut: "2023-07-15",
      room: "Private 201",
      bed: "-",
      status: "reserved"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "checked-in":
        return "bg-green-100 text-green-800";
      case "checked-out":
        return "bg-blue-100 text-blue-800";
      case "reserved":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <AppLayout title="Guests">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Guest Management</h2>
              <p className="text-muted-foreground">Manage your guests' information and bookings</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search guests..."
                className="pl-9 w-[250px]"
              />
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
            
            <Button className="flex items-center gap-2">
              <UserPlus size={16} />
              <span>Add Guest</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="current">
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Guests</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <span>Guest</span>
                            <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Status</th>
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Room/Bed</th>
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Check In</th>
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Check Out</th>
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Contact</th>
                        <th className="text-right p-4 font-medium text-muted-foreground text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.map((guest) => (
                        <motion.tr
                          key={guest.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-b hover:bg-muted/40 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{getInitials(guest.name)}</AvatarFallback>
                                {guest.avatar && <AvatarImage src={guest.avatar} alt={guest.name} />}
                              </Avatar>
                              <div>
                                <p className="font-medium">{guest.name}</p>
                                <p className="text-xs text-muted-foreground">{guest.country}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(guest.status)}>
                              {guest.status === "checked-in" ? "Checked In" : 
                                guest.status === "checked-out" ? "Checked Out" : "Reserved"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Hotel size={16} className="text-muted-foreground" />
                              <span>{guest.room}{guest.bed !== "-" ? ` • Bed ${guest.bed}` : ""}</span>
                            </div>
                          </td>
                          <td className="p-4">{guest.checkIn}</td>
                          <td className="p-4">{guest.checkOut}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <button className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground">
                                <Mail size={16} />
                              </button>
                              <button className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground">
                                <Phone size={16} />
                              </button>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal size={16} />
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">You have 3 upcoming reservations for this week.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Guest History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View previous stays and guest history here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Top Countries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>United States</span>
                <Badge>3</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Spain</span>
                <Badge>2</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Germany</span>
                <Badge>2</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>United Kingdom</span>
                <Badge>1</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Australia</span>
                <Badge>1</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={18} />
              <span>Stay Duration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Average</span>
                <span className="text-sm font-medium">4.5 days</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 mb-4">
                <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Shortest</p>
                  <p className="font-medium">2 days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Longest</p>
                  <p className="font-medium">8 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={18} />
              <span>Guest Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Current Occupancy</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Return Rate</span>
                  <span className="text-sm font-medium">24%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: "24%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Advance Bookings</span>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Guests;
