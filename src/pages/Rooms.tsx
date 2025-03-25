
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Hotel, 
  BedDouble, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  ArrowUpDown,
  Search
} from "lucide-react";
import { motion } from "framer-motion";

interface Room {
  id: number;
  name: string;
  type: string;
  capacity: number;
  bedCount: number;
  occupied: number;
  status: "available" | "maintenance" | "cleaning";
}

interface Bed {
  id: number;
  roomId: number;
  roomName: string;
  number: string;
  isOccupied: boolean;
  guestName?: string;
  checkIn?: string;
  checkOut?: string;
}

const Rooms = () => {
  const [activeTab, setActiveTab] = useState("rooms");
  
  const rooms: Room[] = [
    { id: 1, name: "Dorm 101", type: "Dorm", capacity: 6, bedCount: 6, occupied: 5, status: "available" },
    { id: 2, name: "Dorm 102", type: "Dorm", capacity: 6, bedCount: 6, occupied: 4, status: "available" },
    { id: 3, name: "Dorm 103", type: "Dorm", capacity: 4, bedCount: 4, occupied: 2, status: "available" },
    { id: 4, name: "Dorm 104", type: "Dorm", capacity: 4, bedCount: 4, occupied: 3, status: "available" },
    { id: 5, name: "Private 201", type: "Private", capacity: 2, bedCount: 1, occupied: 2, status: "available" },
    { id: 6, name: "Private 202", type: "Private", capacity: 2, bedCount: 1, occupied: 0, status: "maintenance" },
    { id: 7, name: "Private 203", type: "Private", capacity: 2, bedCount: 1, occupied: 2, status: "available" },
    { id: 8, name: "Family 301", type: "Family", capacity: 4, bedCount: 2, occupied: 4, status: "available" },
    { id: 9, name: "Family 302", type: "Family", capacity: 4, bedCount: 2, occupied: 0, status: "cleaning" },
  ];
  
  const beds: Bed[] = [
    { id: 1, roomId: 1, roomName: "Dorm 101", number: "A", isOccupied: true, guestName: "John Smith", checkIn: "2023-07-01", checkOut: "2023-07-05" },
    { id: 2, roomId: 1, roomName: "Dorm 101", number: "B", isOccupied: true, guestName: "Maria Garcia", checkIn: "2023-07-02", checkOut: "2023-07-06" },
    { id: 3, roomId: 1, roomName: "Dorm 101", number: "C", isOccupied: true, guestName: "Ahmed Hassan", checkIn: "2023-06-30", checkOut: "2023-07-07" },
    { id: 4, roomId: 1, roomName: "Dorm 101", number: "D", isOccupied: true, guestName: "Emma Wilson", checkIn: "2023-07-03", checkOut: "2023-07-09" },
    { id: 5, roomId: 1, roomName: "Dorm 101", number: "E", isOccupied: true, guestName: "Carlos Mendez", checkIn: "2023-07-01", checkOut: "2023-07-08" },
    { id: 6, roomId: 1, roomName: "Dorm 101", number: "F", isOccupied: false },
    { id: 7, roomId: 2, roomName: "Dorm 102", number: "A", isOccupied: true, guestName: "Sophie Chen", checkIn: "2023-07-02", checkOut: "2023-07-06" },
    { id: 8, roomId: 2, roomName: "Dorm 102", number: "B", isOccupied: true, guestName: "Raj Patel", checkIn: "2023-07-01", checkOut: "2023-07-05" },
    { id: 9, roomId: 2, roomName: "Dorm 102", number: "C", isOccupied: false },
    { id: 10, roomId: 2, roomName: "Dorm 102", number: "D", isOccupied: true, guestName: "Olivia Johnson", checkIn: "2023-07-03", checkOut: "2023-07-08" },
    { id: 11, roomId: 2, roomName: "Dorm 102", number: "E", isOccupied: true, guestName: "Luis Fernandez", checkIn: "2023-06-29", checkOut: "2023-07-04" },
    { id: 12, roomId: 2, roomName: "Dorm 102", number: "F", isOccupied: false },
  ];
  
  const getOccupancyRate = (room: Room) => {
    return Math.round((room.occupied / room.capacity) * 100);
  };
  
  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-red-100 text-red-800";
      case "cleaning":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <AppLayout title="Rooms & Beds">
      <div className="mb-6">
        <Tabs defaultValue="rooms" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="rooms" className="flex items-center gap-2">
                <Hotel size={16} />
                <span>Rooms</span>
              </TabsTrigger>
              <TabsTrigger value="beds" className="flex items-center gap-2">
                <BedDouble size={16} />
                <span>Beds</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  className="pl-9 py-2 pr-4 rounded-lg bg-secondary h-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>Add {activeTab === "rooms" ? "Room" : "Bed"}</span>
              </Button>
            </div>
          </div>
          
          <TabsContent value="rooms" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rooms.map((room) => (
                <motion.div 
                  key={room.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="transition-all duration-300"
                >
                  <Card className="overflow-hidden border-solid border">
                    <div className="h-2 bg-primary"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{room.name}</CardTitle>
                          <CardDescription>{room.type} • {room.capacity} Guests</CardDescription>
                        </div>
                        <Badge className={getRoomStatusColor(room.status)}>
                          {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <BedDouble size={18} className="text-muted-foreground" />
                          <span className="text-sm">{room.bedCount} Beds</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={18} className="text-muted-foreground" />
                          <span className="text-sm">{room.occupied}/{room.capacity} Occupied</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Occupancy</span>
                          <span>{getOccupancyRate(room)}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full" 
                            style={{ width: `${getOccupancyRate(room)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit size={14} className="mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <BedDouble size={14} className="mr-1" />
                          Beds
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="beds" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <span>Bed</span>
                            <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <span>Room</span>
                            <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <span>Status</span>
                            <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <span>Guest</span>
                            <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Check In</th>
                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Check Out</th>
                        <th className="text-right p-4 font-medium text-muted-foreground text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beds.map((bed) => (
                        <tr key={bed.id} className="border-b hover:bg-muted/40 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                <BedDouble size={16} />
                              </div>
                              <span>{bed.number}</span>
                            </div>
                          </td>
                          <td className="p-4">{bed.roomName}</td>
                          <td className="p-4">
                            {bed.isOccupied ? (
                              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                <div className="flex items-center gap-1">
                                  <XCircle size={14} />
                                  <span>Occupied</span>
                                </div>
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                <div className="flex items-center gap-1">
                                  <CheckCircle size={14} />
                                  <span>Available</span>
                                </div>
                              </Badge>
                            )}
                          </td>
                          <td className="p-4">{bed.guestName || "-"}</td>
                          <td className="p-4">{bed.checkIn || "-"}</td>
                          <td className="p-4">{bed.checkOut || "-"}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit size={16} />
                              </Button>
                              {!bed.isOccupied && (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                                  <Trash2 size={16} />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Rooms;
