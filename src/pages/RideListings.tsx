import { useParams } from "react-router-dom";
import { RideCard } from "@/components/RideCard";
import { AddRideButton } from "@/components/AddRideButton";

// Mock data for initial display
const MOCK_RIDES = [
  {
    id: 1,
    departureTime: "Today at 2:30 PM",
    startLocation: "Middlebury Campus",
    endLocation: "Burlington Airport",
    availableSeats: 3,
    womenOnly: false,
    direction: "leaving"
  },
  {
    id: 2,
    departureTime: "Tomorrow at 9:00 AM",
    startLocation: "Albany Airport",
    endLocation: "Middlebury Campus",
    availableSeats: 2,
    womenOnly: true,
    direction: "arriving"
  }
];

export default function RideListings() {
  const { direction } = useParams();
  
  const rides = MOCK_RIDES.filter(ride => ride.direction === direction);
  
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
          {rides.map((ride) => (
            <RideCard
              key={ride.id}
              departureTime={ride.departureTime}
              startLocation={ride.startLocation}
              endLocation={ride.endLocation}
              availableSeats={ride.availableSeats}
              womenOnly={ride.womenOnly}
            />
          ))}
          {rides.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No rides available. Be the first to add one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}