import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MOCK_RIDES } from "@/lib/mock-data"; // Add this import

interface AddRideFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
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
    // In a real app, this would be an API call
    const newRide = {
      id: Date.now(),
      ...data,
      direction,
    };
    
    // For now, we'll add it to our mock data
    MOCK_RIDES.push(newRide);
    
    // Close the dialog and refresh the page to show the new ride
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
            <FormField
              control={form.control}
              name="departureTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="startLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availableSeats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Seats</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1} 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="womenOnly"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Ride Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={value => field.onChange(value === "true")}
                      defaultValue={field.value.toString()}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="regular" />
                        <label htmlFor="regular">Regular Ride</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="womenOnly" />
                        <label htmlFor="womenOnly">Women Only</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">Add Ride</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}