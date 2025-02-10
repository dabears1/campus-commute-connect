
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone, DollarSign } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { TaxiDriverCardProps } from "@/lib/types";

export function TaxiDriverCard({
  id,
  available_locations,
  available_hours,
  pricing_mechanism,
  trip_pricing_type,
  price_per_mile,
  trip_price,
  accepted_payments,
  phone_number,
  onContactRequest,
}: TaxiDriverCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const { toast } = useToast();

  const handleContactRequest = () => {
    onContactRequest(id);
    setShowPhoneNumber(true);
    setIsDialogOpen(false);
    toast({
      title: "Contact request sent",
      description: "You can now contact the driver.",
    });
  };

  const renderPricing = () => {
    if (pricing_mechanism === "perMile" && price_per_mile) {
      return `$${price_per_mile}/mile`;
    } else if (pricing_mechanism === "perTrip" && trip_price) {
      if (trip_pricing_type === "onePrice") {
        return `$${trip_price}/trip`;
      } else {
        return `$${trip_price}/person/trip`;
      }
    }
    return "Price not specified";
  };

  return (
    <>
      <Card 
        className="p-4 hover:shadow-md transition-all cursor-pointer" 
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{available_hours}</span>
            </div>
            <Badge variant="secondary">{renderPricing()}</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{available_locations.join(", ")}</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span>Accepts: {accepted_payments.join(", ")}</span>
          </div>

          {showPhoneNumber && (
            <div className="flex items-center gap-2 text-green-600">
              <Phone className="w-4 h-4" />
              <span>{phone_number}</span>
            </div>
          )}
        </div>
      </Card>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request Driver Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to request contact information for this driver?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleContactRequest}>
              Request Contact
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
