import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../AddRideForm";

interface RideDetailsFieldsProps {
  form: UseFormReturn<FormData>;
}

export function RideDetailsFields({ form }: RideDetailsFieldsProps) {
  return (
    <>
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
    </>
  );
}