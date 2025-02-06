
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RideCard } from "@/components/RideCard";
import { AddRideButton } from "@/components/AddRideButton";
import { MOCK_RIDES, Ride } from "@/lib/mock-data";
import { TaxiDriver } from "@/lib/types";
import { TaxiDriverCard } from "@/components/taxi/TaxiDriverCard";
import { Button } from "@/components/ui/button";
import { AddTaxiDriverForm } from "@/components/taxi/AddTaxiDriverForm";

const MOCK_TAXI_DRIVERS: TaxiDriver[] = [];

export default function RideListings() {
  const { direction } = useParams();
  const [rides, setRides] = useState<Ride[]>(MOCK_RIDES);
  const [taxiDrivers, setTaxiDrivers] = useState<TaxiDriver[]>(MOCK_TAXI_DRIVERS);
  const [isAddDriverFormOpen, setIsAddDriverFormOpen] = useState(false);
  
  const handleSeatClaim = (rideId: number) => {
    setRides(currentRides =>
      currentRides.map(ride =>
        ride.id === rideId
          ? { ...ride, availableSeats: ride.availableSeats - 1 }
          : ride
      )
    );
  };

  const handleContactRequest = (driverId: number) => {
    // In a real app, this would handle the contact request logic
    console.log("Contact requested for driver:", driverId);
  };

  const handleAddDriver = (formData: any) => {
    const newDriver: TaxiDriver = {
      id: Date.now(),
      availableLocations: formData.availableLocations.split(",").map((loc: string) => loc.trim()),
      availableHours: formData.availableHours,
      pricingMechanism: formData.pricingMechanism,
      ...(formData.pricingMechanism === "perMile" ? { pricePerMile: formData.pricePerMile } : {}),
      ...(formData.pricingMechanism === "perTrip" ? {
        tripPricingType: formData.tripPricingType,
        tripPrice: formData.tripPrice
      } : {}),
      acceptedPayments: formData.acceptedPayments,
      phoneNumber: formData.phoneNumber,
    };
    setTaxiDrivers(current => [...current, newDriver]);
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
              {...ride}
              onSeatClaim={handleSeatClaim}
            />
          ))}
          {filteredRides.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No rides available. Be the first to add one!
            </p>
          )}
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">MiddTaxi Drivers</h2>
            <Button onClick={() => setIsAddDriverFormOpen(true)}>
              Add Driver Listing
            </Button>
          </div>
          
          <div className="space-y-4">
            {taxiDrivers.map((driver) => (
              <TaxiDriverCard
                key={driver.id}
                {...driver}
                onContactRequest={handleContactRequest}
              />
            ))}
            {taxiDrivers.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No taxi drivers available. Be the first to add a listing!
              </p>
            )}
          </div>
        </div>
      </div>

      <AddTaxiDriverForm
        open={isAddDriverFormOpen}
        onOpenChange={setIsAddDriverFormOpen}
        onSubmit={handleAddDriver}
      />
    </div>
  );
}
