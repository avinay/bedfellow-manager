
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface NewGuestDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewGuestDialog = ({ open, onClose, onSuccess }: NewGuestDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    room: "",
    bed: "",
    check_in: "",
    check_out: "",
    status: "reserved",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.check_in || !formData.room) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await supabase.from("guests").insert([formData]);

      if (error) throw error;

      toast.success("Guest added successfully");
      onSuccess();
    } catch (error: any) {
      console.error("Error adding guest:", error);
      toast.error(error.message || "Failed to add guest");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Guest</DialogTitle>
          <DialogDescription>Enter guest information to create a new reservation</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Guest name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room">Room *</Label>
                <Input
                  id="room"
                  name="room"
                  placeholder="Room number"
                  value={formData.room}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bed">Bed</Label>
                <Input
                  id="bed"
                  name="bed"
                  placeholder="Bed number"
                  value={formData.bed}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="check_in">Check In *</Label>
                <Input
                  id="check_in"
                  name="check_in"
                  type="date"
                  value={formData.check_in}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="check_out">Check Out</Label>
                <Input
                  id="check_out"
                  name="check_out"
                  type="date"
                  value={formData.check_out}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="checked-in">Checked In</SelectItem>
                  <SelectItem value="checked-out">Checked Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Add Guest"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGuestDialog;
