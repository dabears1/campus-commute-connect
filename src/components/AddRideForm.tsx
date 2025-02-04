import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { MOCK_RIDES } from "@/lib/mock-data";
import { DepartureTimeField } from "./form-fields/DepartureTimeField";
import { LocationFields } from "./form-fields/LocationFields";
import { RideDetailsFields } from "./form-fields/RideDetailsFields";

interface AddRideFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface FormData {
  departureTime: string;
  startLocation: string;
  endLocation: string;
  availableSeats: number;
  womenOnly: boolean;
}

export function AddRideForm({ open, onOpenChange }: AddRideFormProps) {
  const { direction } = useParams();
  const navigate = useNavigate();
  const form = useForm<FormData>({
    defaultValues: {
      departureTime: "",
      startLocation: "",
      endLocation: "",
      availableSeats: 1,
      womenOnly: false,
    },
  });

  const onSubmit = (data: FormData) => {
    const newRide = {
      id: Date.now(),
      ...data,
      direction,
    };
    
    MOCK_RIDES.push(newRide);
    onOpenChange(false);
    navigate(`/rides/${direction}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Ride</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DepartureTimeField form={form} />
            <LocationFields form={form} />
            <RideDetailsFields form={form} />
            <Button type="submit" className="w-full">Add Ride</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}