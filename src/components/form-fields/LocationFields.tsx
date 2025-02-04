import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../AddRideForm";

interface LocationFieldsProps {
  form: UseFormReturn<FormData>;
}

export function LocationFields({ form }: LocationFieldsProps) {
  return (
    <>
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
    </>
  );
}