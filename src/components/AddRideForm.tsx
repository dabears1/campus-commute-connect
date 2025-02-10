
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DepartureTimeField } from "./form-fields/DepartureTimeField";
import { LocationFields } from "./form-fields/LocationFields";
import { RideDetailsFields } from "./form-fields/RideDetailsFields";
import { PhoneNumberField } from "./form-fields/PhoneNumberField";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { RideDirection } from "@/lib/types";

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
  phoneNumber: string;
  passengerCanDrive: boolean;
}

export function AddRideForm({ open, onOpenChange }: AddRideFormProps) {
  const { direction } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    defaultValues: {
      departureTime: "",
      startLocation: "",
      endLocation: "",
      availableSeats: 1,
      womenOnly: false,
      phoneNumber: "",
      passengerCanDrive: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    const newRide = {
      departure_time: new Date(data.departureTime).toISOString(),
      start_location: data.startLocation,
      end_location: data.endLocation,
      available_seats: data.availableSeats,
      women_only: data.womenOnly,
      phone_number: data.phoneNumber,
      passenger_can_drive: data.passengerCanDrive,
      direction: direction as RideDirection,
    };
    
    const { error } = await supabase
      .from('rides')
      .insert([newRide]);

    if (error) {
      console.error('Error adding ride:', error);
      toast({
        title: "Error",
        description: "Failed to add ride. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Ride added successfully!",
    });
    
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
            <PhoneNumberField form={form} />
            <Button type="submit" className="w-full">Add Ride</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
