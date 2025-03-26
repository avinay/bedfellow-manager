
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface GuestFormActionsProps {
  isSubmitting: boolean;
}

const GuestFormActions = ({ isSubmitting }: GuestFormActionsProps) => {
  return (
    <>
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
    </>
  );
};

export default GuestFormActions;
