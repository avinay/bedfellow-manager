
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row">
        <motion.div 
          className="flex-1 p-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl mb-6">
              BM
            </div>
            <h1 className="text-4xl font-bold mb-4">BedManager</h1>
            <p className="text-xl text-muted-foreground">
              A modern, intuitive hostel management system designed with simplicity and elegance in mind.
            </p>
          </div>
          
          <div className="space-y-6">
            <motion.div 
              className="flex items-start gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 7v10c0 4-4 4-4 4H9c-4 0-4-4-4-4V7c0-4 4-4 4-4h6c4 0 4 4 4 4Z"></path>
                  <path d="M9 10h6"></path>
                  <path d="M9 14h6"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Streamlined Management</h3>
                <p className="text-muted-foreground">Efficiently manage rooms, beds, and guest information in one place.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m7.9 20 6.2-16h2l-6.2 16Z"></path>
                  <path d="M5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  <path d="M19 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  <path d="M12 12h4"></path>
                  <path d="M12 8h7"></path>
                  <path d="M12 4h3"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Real-time Analytics</h3>
                <p className="text-muted-foreground">Track occupancy rates and performance metrics with beautiful visualizations.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 10v12"></path>
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Enhanced Guest Experience</h3>
                <p className="text-muted-foreground">Provide a seamless experience with integrated ticket systems and notifications.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex-1 flex items-center justify-center p-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access the dashboard</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded border-gray-300" />
                    <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Sign In</Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
