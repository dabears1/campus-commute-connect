
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { PaymentMethod } from "@/lib/types";

interface AddTaxiDriverFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  availableLocations: string;
  availableHours: string;
  pricePerMile: number;
  acceptedPayments: PaymentMethod[];
  phoneNumber: string;
}

const PAYMENT_METHODS: PaymentMethod[] = ["Zelle", "CashApp", "PayPal", "Venmo"];

export function AddTaxiDriverForm({ open, onOpenChange, onSubmit }: AddTaxiDriverFormProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    defaultValues: {
      availableLocations: "",
      availableHours: "",
      pricePerMile: 0,
      acceptedPayments: [],
      phoneNumber: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    if (data.acceptedPayments.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one payment method",
        variant: "destructive",
      });
      return;
    }

    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Taxi Driver</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="availableLocations"
              rules={{ required: "Available locations are required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Locations</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Burlington, Rutland, Albany"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availableHours"
              rules={{ required: "Available hours are required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Hours</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Weekends 9AM-5PM"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pricePerMile"
              rules={{ 
                required: "Price per mile is required",
                min: { value: 0, message: "Price must be positive" }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Mile ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      step="0.1"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptedPayments"
              rules={{ required: "At least one payment method is required" }}
              render={() => (
                <FormItem>
                  <FormLabel>Accepted Payment Methods</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENT_METHODS.map((method) => (
                      <FormField
                        key={method}
                        control={form.control}
                        name="acceptedPayments"
                        render={({ field }) => (
                          <FormItem
                            key={method}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(method)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...field.value, method]
                                    : field.value?.filter((value) => value !== method);
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {method}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid 10-digit phone number"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="1234567890"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Add Driver Listing</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
