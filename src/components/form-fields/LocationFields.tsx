
import { useParams } from "react-router-dom";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../AddRideForm";

const CAMPUS_LOCATIONS = [
  "ADK Circle",
  "Admissions (Emma Willard House)",
  "Allen Hall",
  "Atwater Suites",
  "Centeno House",
  "College Park",
  "Mahaney Arts Center",
  "Chellis",
  "Coffrin",
  "College Street",
  "Dragone Track",
  "Emma Willard House (Admissions)",
  "Farrell House",
  "Field House",
  "Fitness Center",
  "Franklin Environmental Center",
  "Freeman International Center",
  "Golf Course",
  "Hillcrest Road (tennis courts)",
  "Homestead House",
  "Johnson Memorial Building",
  "Kenyon Arena",
  "Kirk Alumni Center",
  "Library (Storrs Avenue)",
  "Longwell House",
  "McCardell Bicentennial Hall",
  "Meeker House",
  "Town Houses",
  "Old Chapel Road",
  "Perkins House",
  "Proctor Hall",
  "Ridgeline Road",
  "Robert A. Jones '59 House",
  "Service Building",
  "Stewart Hall",
  "Twilight Hall",
  "Weybridge House",
  "Wright Theatre"
];

interface LocationFieldsProps {
  form: UseFormReturn<FormData>;
}

export function LocationFields({ form }: LocationFieldsProps) {
  const { direction } = useParams();
  
  return (
    <>
      <FormField
        control={form.control}
        name="startLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Location</FormLabel>
            <FormControl>
              {direction === "leaving" ? (
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAMPUS_LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input {...field} />
              )}
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
              {direction === "to" ? (
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a destination on campus" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAMPUS_LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input {...field} />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
