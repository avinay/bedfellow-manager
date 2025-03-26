
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  UserPlus,
  Hotel,
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import NewGuestDialog from "@/components/guests/NewGuestDialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface Guest {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  country: string;
  check_in: string;
  check_out: string;
  room: string;
  bed: string | null;
  status: "checked-in" | "checked-out" | "reserved";
  avatar?: string;
}

const fetchGuests = async (): Promise<Guest[]> => {
  const { data, error } = await supabase
    .from("guests")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

const Guests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("current");
  const [showNewGuestDialog, setShowNewGuestDialog] = useState(false);
  
  const { 
    data: guests = [], 
    isLoading, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ["guests"],
    queryFn: fetchGuests
  });

  const handleRefresh = () => {
    refetch();
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (guest.country && guest.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (guest.email && guest.email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (currentTab === "current") {
      return matchesSearch && guest.status === "checked-in";
    } else if (currentTab === "upcoming") {
      return matchesSearch && guest.status === "reserved";
    } else if (currentTab === "history") {
      return matchesSearch && guest.status === "checked-out";
    }
    
    return matchesSearch;
  });

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

  // Country statistics
  const countryStats = guests.reduce((acc: Record<string, number>, guest) => {
    const country = guest.country || "Unknown";
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const topCountries = Object.entries(countryStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Stay duration statistics
  const stayDurations = guests.map(guest => {
    const checkIn = new Date(guest.check_in);
    const checkOut = new Date(guest.check_out);
    return Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  }).filter(days => !isNaN(days));

  const averageStay = stayDurations.length 
    ? (stayDurations.reduce((sum, days) => sum + days, 0) / stayDurations.length).toFixed(1) 
    : "0.0";
  
  const shortestStay = stayDurations.length ? Math.min(...stayDurations) : 0;
  const longestStay = stayDurations.length ? Math.max(...stayDurations) : 0;

  // Occupancy calculation (assuming 10 beds for this example)
  const totalBeds = 10;
  const occupiedBeds = guests.filter(guest => guest.status === "checked-in").length;
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
            
            <Button 
              className="flex items-center gap-2"
              onClick={() => setShowNewGuestDialog(true)}
            >
              <UserPlus size={16} />
              <span>Add Guest</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="current" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Guests</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : isError ? (
                  <div className="flex justify-center items-center p-8 text-destructive">
                    Error loading guests. Please try again.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              <span>Guest</span>
                              <ArrowUpDown size={14} />
                            </div>
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Room/Bed</TableHead>
                          <TableHead>Check In</TableHead>
                          <TableHead>Check Out</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGuests.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No guests found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredGuests.map((guest) => (
                            <motion.tr
                              key={guest.id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-b hover:bg-muted/40 transition-colors"
                            >
                              <TableCell>
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
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(guest.status)}>
                                  {guest.status === "checked-in" ? "Checked In" : 
                                    guest.status === "checked-out" ? "Checked Out" : "Reserved"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Hotel size={16} className="text-muted-foreground" />
                                  <span>{guest.room}{guest.bed ? ` • Bed ${guest.bed}` : ""}</span>
                                </div>
                              </TableCell>
                              <TableCell>{guest.check_in}</TableCell>
                              <TableCell>{guest.check_out}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  {guest.email && (
                                    <button 
                                      className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground"
                                      onClick={() => window.location.href = `mailto:${guest.email}`}
                                    >
                                      <Mail size={16} />
                                    </button>
                                  )}
                                  {guest.phone && (
                                    <button 
                                      className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground"
                                      onClick={() => window.location.href = `tel:${guest.phone}`}
                                    >
                                      <Phone size={16} />
                                    </button>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </TableCell>
                            </motion.tr>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              <span>Guest</span>
                              <ArrowUpDown size={14} />
                            </div>
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Room/Bed</TableHead>
                          <TableHead>Check In</TableHead>
                          <TableHead>Check Out</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGuests.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No upcoming reservations
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredGuests.map((guest) => (
                            <motion.tr
                              key={guest.id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-b hover:bg-muted/40 transition-colors"
                            >
                              <TableCell>
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
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(guest.status)}>
                                  {guest.status === "checked-in" ? "Checked In" : 
                                    guest.status === "checked-out" ? "Checked Out" : "Reserved"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Hotel size={16} className="text-muted-foreground" />
                                  <span>{guest.room}{guest.bed ? ` • Bed ${guest.bed}` : ""}</span>
                                </div>
                              </TableCell>
                              <TableCell>{guest.check_in}</TableCell>
                              <TableCell>{guest.check_out}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  {guest.email && (
                                    <button 
                                      className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground"
                                      onClick={() => window.location.href = `mailto:${guest.email}`}
                                    >
                                      <Mail size={16} />
                                    </button>
                                  )}
                                  {guest.phone && (
                                    <button 
                                      className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground"
                                      onClick={() => window.location.href = `tel:${guest.phone}`}
                                    >
                                      <Phone size={16} />
                                    </button>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </TableCell>
                            </motion.tr>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              <span>Guest</span>
                              <ArrowUpDown size={14} />
                            </div>
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Room/Bed</TableHead>
                          <TableHead>Check In</TableHead>
                          <TableHead>Check Out</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGuests.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No guest history found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredGuests.map((guest) => (
                            <motion.tr
                              key={guest.id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-b hover:bg-muted/40 transition-colors"
                            >
                              <TableCell>
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
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(guest.status)}>
                                  {guest.status === "checked-in" ? "Checked In" : 
                                    guest.status === "checked-out" ? "Checked Out" : "Reserved"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Hotel size={16} className="text-muted-foreground" />
                                  <span>{guest.room}{guest.bed ? ` • Bed ${guest.bed}` : ""}</span>
                                </div>
                              </TableCell>
                              <TableCell>{guest.check_in}</TableCell>
                              <TableCell>{guest.check_out}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  {guest.email && (
                                    <button 
                                      className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground"
                                      onClick={() => window.location.href = `mailto:${guest.email}`}
                                    >
                                      <Mail size={16} />
                                    </button>
                                  )}
                                  {guest.phone && (
                                    <button 
                                      className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground"
                                      onClick={() => window.location.href = `tel:${guest.phone}`}
                                    >
                                      <Phone size={16} />
                                    </button>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </TableCell>
                            </motion.tr>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
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
              {topCountries.length === 0 ? (
                <li className="text-center py-4 text-muted-foreground">No data available</li>
              ) : (
                topCountries.map(([country, count]) => (
                  <li key={country} className="flex items-center justify-between">
                    <span>{country}</span>
                    <Badge>{count}</Badge>
                  </li>
                ))
              )}
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
                <span className="text-sm font-medium">{averageStay} days</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 mb-4">
                <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(Number(averageStay) * 10, 100)}%` }}></div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Shortest</p>
                  <p className="font-medium">{shortestStay} days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Longest</p>
                  <p className="font-medium">{longestStay} days</p>
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
                  <span className="text-sm font-medium">{occupancyRate}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${occupancyRate}%` }}></div>
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

      {showNewGuestDialog && (
        <NewGuestDialog 
          open={showNewGuestDialog}
          onClose={() => setShowNewGuestDialog(false)}
          onSuccess={() => {
            setShowNewGuestDialog(false);
            handleRefresh();
          }}
        />
      )}
    </AppLayout>
  );
};

export default Guests;
