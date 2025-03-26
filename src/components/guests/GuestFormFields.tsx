
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GuestFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  room: string;
  bed: string;
  check_in: string;
  check_out: string;
  status: string;
}

interface GuestFormFieldsProps {
  formData: GuestFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const GuestFormFields = ({ formData, handleChange, handleSelectChange }: GuestFormFieldsProps) => {
  return (
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
  );
};

export default GuestFormFields;
