
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Users, Hotel, Ticket, AlertTriangle, CheckCircle, Clock, Utensils } from "lucide-react";

const Dashboard = () => {
  const occupancyData = [
    { name: "Mon", value: 85 },
    { name: "Tue", value: 78 },
    { name: "Wed", value: 90 },
    { name: "Thu", value: 95 },
    { name: "Fri", value: 98 },
    { name: "Sat", value: 100 },
    { name: "Sun", value: 92 },
  ];

  const ticketData = [
    { name: "Resolved", value: 24, color: "#10B981" },
    { name: "Pending", value: 8, color: "#F59E0B" },
    { name: "New", value: 5, color: "#3B82F6" },
  ];

  const roomTypeData = [
    { name: "Dorm (6 Bed)", value: 12 },
    { name: "Dorm (4 Bed)", value: 8 },
    { name: "Private", value: 6 },
    { name: "Family", value: 3 },
  ];

  const recentActivities = [
    { id: 1, action: "Check-in", guest: "John Smith", room: "Dorm 101", time: "10 min ago" },
    { id: 2, action: "New Ticket", description: "Broken shower in Room 203", time: "25 min ago" },
    { id: 3, action: "Check-out", guest: "Maria Garcia", room: "Private 304", time: "1 hour ago" },
    { id: 4, action: "Ticket Resolved", description: "AC repair in Room 105", time: "2 hours ago" },
    { id: 5, action: "New Booking", guest: "Ahmed Hassan", room: "Dorm 102", time: "3 hours ago" },
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Beds</p>
                <p className="text-3xl font-bold mt-1">124</p>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-500 font-medium">92% </span>
                  occupancy rate
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                <Hotel size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Guests</p>
                <p className="text-3xl font-bold mt-1">86</p>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-500 font-medium">+12 </span>
                  from yesterday
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Users size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Tickets</p>
                <p className="text-3xl font-bold mt-1">13</p>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-amber-500 font-medium">8 </span>
                  need attention
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Ticket size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Meals</p>
                <p className="text-3xl font-bold mt-1">92</p>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-500 font-medium">78 </span>
                  served so far
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Utensils size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 card-hover">
          <CardHeader className="pb-2">
            <CardTitle>Weekly Occupancy Rate</CardTitle>
            <CardDescription>Bed occupancy for the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Occupancy']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle>Ticket Status</CardTitle>
            <CardDescription>Current support tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {ticketData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Room Distribution</CardTitle>
            <CardDescription>Breakdown by room type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomTypeData.map((room, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-primary opacity-${(100 - index * 20)}`}></div>
                    <span>{room.name}</span>
                  </div>
                  <span className="font-medium">{room.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 card-hover">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events in the hostel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {activity.action === "Check-in" && (
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckCircle size={16} />
                      </div>
                    )}
                    {activity.action === "Check-out" && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Users size={16} />
                      </div>
                    )}
                    {activity.action === "New Ticket" && (
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <AlertTriangle size={16} />
                      </div>
                    )}
                    {activity.action === "Ticket Resolved" && (
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Ticket size={16} />
                      </div>
                    )}
                    {activity.action === "New Booking" && (
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Hotel size={16} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-base">
                        {activity.action}
                        {activity.action === "New Ticket" || activity.action === "Ticket Resolved" ? (
                          <Badge variant="outline" className="ml-2">Ticket</Badge>
                        ) : null}
                      </h4>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    {activity.guest && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.guest} • {activity.room}
                      </p>
                    )}
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
