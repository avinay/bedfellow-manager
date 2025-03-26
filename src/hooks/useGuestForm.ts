
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

export const useGuestForm = (onSuccess: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<GuestFormData>({
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

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
};
