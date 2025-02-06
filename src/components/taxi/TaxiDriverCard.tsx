
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
import { TaxiDriver } from "@/lib/types";

interface TaxiDriverCardProps extends TaxiDriver {
  onContactRequest: (driverId: number) => void;
}

export function TaxiDriverCard({
  id,
  availableLocations,
  availableHours,
  pricePerMile,
  acceptedPayments,
  phoneNumber,
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
              <span>{availableHours}</span>
            </div>
            <Badge variant="secondary">${pricePerMile}/mile</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{availableLocations.join(", ")}</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span>Accepts: {acceptedPayments.join(", ")}</span>
          </div>

          {showPhoneNumber && (
            <div className="flex items-center gap-2 text-green-600">
              <Phone className="w-4 h-4" />
              <span>{phoneNumber}</span>
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
