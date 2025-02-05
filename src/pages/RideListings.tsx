
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RideCard } from "@/components/RideCard";
import { AddRideButton } from "@/components/AddRideButton";
import { MOCK_RIDES, Ride } from "@/lib/mock-data";

export default function RideListings() {
  const { direction } = useParams();
  const [rides, setRides] = useState<Ride[]>(MOCK_RIDES);
  
  const handleSeatClaim = (rideId: number) => {
    setRides(currentRides =>
      currentRides.map(ride =>
        ride.id === rideId
          ? { ...ride, availableSeats: ride.availableSeats - 1 }
          : ride
      )
    );
  };
  
  const filteredRides = rides.filter(ride => ride.direction === direction);
  
  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {direction === "leaving" ? "Rides Leaving Campus" : "Rides to Campus"}
          </h1>
          <AddRideButton />
        </div>
        
        <div className="space-y-4">
          {filteredRides.map((ride) => (
            <RideCard
              key={ride.id}
              id={ride.id}
              departureTime={ride.departureTime}
              startLocation={ride.startLocation}
              endLocation={ride.endLocation}
              availableSeats={ride.availableSeats}
              womenOnly={ride.womenOnly}
              phoneNumber={ride.phoneNumber}
              onSeatClaim={handleSeatClaim}
            />
          ))}
          {filteredRides.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No rides available. Be the first to add one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
