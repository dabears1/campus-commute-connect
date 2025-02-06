
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaymentMethod, PricingMechanism, TripPricingType } from "@/lib/types";

interface AddTaxiDriverFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  availableLocations: string;
  availableHours: string;
  pricingMechanism: PricingMechanism;
  tripPricingType?: TripPricingType;
  pricePerMile?: number;
  tripPrice?: number;
  acceptedPayments: PaymentMethod[];
  phoneNumber: string;
}

const PAYMENT_METHODS: PaymentMethod[] = ["Zelle", "CashApp", "PayPal", "Venmo"];
const REFERENCE_PRICE_PER_MILE = 1.35; // $50/37 miles (Middlebury to Burlington Airport)

export function AddTaxiDriverForm({ open, onOpenChange, onSubmit }: AddTaxiDriverFormProps) {
  const { toast } = useToast();
  const [pricingMechanism, setPricingMechanism] = useState<PricingMechanism>("perMile");
  const form = useForm<FormData>({
    defaultValues: {
      availableLocations: "",
      availableHours: "",
      pricingMechanism: "perMile",
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
              name="pricingMechanism"
              rules={{ required: "Pricing mechanism is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing Mechanism</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={(value: PricingMechanism) => {
                        field.onChange(value);
                        setPricingMechanism(value);
                      }}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="perMile" id="perMile" />
                        <FormLabel htmlFor="perMile" className="font-normal">
                          Price per Mile
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="perTrip" id="perTrip" />
                        <FormLabel htmlFor="perTrip" className="font-normal">
                          Fixed Price per Trip
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {pricingMechanism === "perMile" && (
              <>
                <Alert>
                  <InfoIcon className="h-4 w-4" />
                  <AlertDescription>
                    Reference price: ${REFERENCE_PRICE_PER_MILE.toFixed(2)}/mile (based on Middlebury to Burlington Airport)
                  </AlertDescription>
                </Alert>

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
              </>
            )}

            {pricingMechanism === "perTrip" && (
              <>
                <FormField
                  control={form.control}
                  name="tripPricingType"
                  rules={{ required: "Trip pricing type is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trip Pricing Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={(value: TripPricingType) => field.onChange(value)}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="onePrice" id="onePrice" />
                            <FormLabel htmlFor="onePrice" className="font-normal">
                              One Price per Trip
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="perPerson" id="perPerson" />
                            <FormLabel htmlFor="perPerson" className="font-normal">
                              Price per Person
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tripPrice"
                  rules={{ 
                    required: "Trip price is required",
                    min: { value: 0, message: "Price must be positive" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trip Price ($)</FormLabel>
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
              </>
            )}

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
