import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddRideForm } from "./AddRideForm";

export function AddRideButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Add New Ride
      </Button>
      <AddRideForm open={open} onOpenChange={setOpen} />
    </>
  );
}