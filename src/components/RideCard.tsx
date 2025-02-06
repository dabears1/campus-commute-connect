
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, ArrowRight, Phone, Steering } from "lucide-react";
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

interface RideCardProps {
  id: number;
  departureTime: string;
  startLocation: string;
  endLocation: string;
  availableSeats: number;
  womenOnly: boolean;
  phoneNumber?: string;
  passengerCanDrive: boolean;
  onSeatClaim: (rideId: number) => void;
}

export function RideCard({
  id,
  departureTime,
  startLocation,
  endLocation,
  availableSeats,
  womenOnly,
  phoneNumber = "",
  passengerCanDrive,
  onSeatClaim,
}: RideCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const { toast } = useToast();

  const handleClaimSeat = () => {
    onSeatClaim(id);
    setShowPhoneNumber(true);
    setIsDialogOpen(false);
    toast({
      title: "Seat claimed successfully",
      description: "You have claimed a seat for this ride.",
    });
  };

  return (
    <>
      <Card 
        className="p-4 hover:shadow-md transition-all cursor-pointer" 
        onClick={() => availableSeats > 0 && setIsDialogOpen(true)}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{departureTime}</span>
            </div>
            <div className="flex gap-2">
              {womenOnly && (
                <Badge variant="secondary">Women Only</Badge>
              )}
              {passengerCanDrive && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Steering className="w-3 h-3" />
                  Can share driving
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <span>{startLocation}</span>
              <ArrowRight className="w-4 h-4" />
              <span>{endLocation}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{availableSeats} seats available</span>
          </div>

          {showPhoneNumber && phoneNumber && (
            <div className="flex items-center gap-2 text-green-600">
              <Phone className="w-4 h-4" />
              <span>{phoneNumber} (Send your driver a text message)</span>
            </div>
          )}
        </div>
      </Card>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Claim a seat</AlertDialogTitle>
            <AlertDialogDescription>
              <p>Would you like to claim a seat for this ride?</p>
              <p className="mt-2 text-sm italic">
                * By claiming this seat, you are agreeing to split gas with the driver. The driver's contact information will be shown after claiming.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClaimSeat}>
              Claim Seat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
