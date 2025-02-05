
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../AddRideForm";

interface PhoneNumberFieldProps {
  form: UseFormReturn<FormData>;
}

export function PhoneNumberField({ form }: PhoneNumberFieldProps) {
  return (
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
  );
}
