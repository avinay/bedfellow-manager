
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GuestFormFields from "./GuestFormFields";
import GuestFormActions from "./GuestFormActions";
import { useGuestForm } from "@/hooks/useGuestForm";

interface NewGuestDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewGuestDialog = ({ open, onClose, onSuccess }: NewGuestDialogProps) => {
  const { formData, isSubmitting, handleChange, handleSelectChange, handleSubmit } = useGuestForm(onSuccess);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Guest</DialogTitle>
          <DialogDescription>Enter guest information to create a new reservation</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <GuestFormFields 
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />

          <DialogFooter>
            <GuestFormActions isSubmitting={isSubmitting} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGuestDialog;
