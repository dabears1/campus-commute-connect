import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";

interface RideCardProps {
  departureTime: string;
  startLocation: string;
  endLocation: string;
  availableSeats: number;
  womenOnly: boolean;
}

export function RideCard({
  departureTime,
  startLocation,
  endLocation,
  availableSeats,
  womenOnly,
}: RideCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-all">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{departureTime}</span>
          </div>
          {womenOnly && (
            <Badge variant="secondary">Women Only</Badge>
          )}
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
      </div>
    </Card>
  );
}