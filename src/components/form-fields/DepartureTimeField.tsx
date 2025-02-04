import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../AddRideForm";

interface DepartureTimeFieldProps {
  form: UseFormReturn<FormData>;
}

export function DepartureTimeField({ form }: DepartureTimeFieldProps) {
  return (
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
  );
}