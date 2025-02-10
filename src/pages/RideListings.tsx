
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RideCard } from "@/components/RideCard";
import { AddRideButton } from "@/components/AddRideButton";
import { TaxiDriver, Ride, RideDirection } from "@/lib/types";
import { TaxiDriverCard } from "@/components/taxi/TaxiDriverCard";
import { Button } from "@/components/ui/button";
import { AddTaxiDriverForm } from "@/components/taxi/AddTaxiDriverForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function RideListings() {
  const { direction } = useParams<{ direction: RideDirection }>();
  const { toast } = useToast();
  const [isAddDriverFormOpen, setIsAddDriverFormOpen] = useState(false);
  
  const { data: rides = [], refetch: refetchRides } = useQuery({
    queryKey: ['rides', direction],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('direction', direction)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching rides:', error);
        toast({
          title: "Error",
          description: "Failed to load rides. Please try again.",
          variant: "destructive",
        });
        return [];
      }
      
      return data as Ride[];
    },
  });

  const { data: taxiDrivers = [], refetch: refetchDrivers } = useQuery({
    queryKey: ['taxiDrivers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('taxi_drivers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching taxi drivers:', error);
        toast({
          title: "Error",
          description: "Failed to load taxi drivers. Please try again.",
          variant: "destructive",
        });
        return [];
      }
      
      return data as TaxiDriver[];
    },
  });
  
  const handleSeatClaim = async (rideId: number) => {
    const ride = rides.find(r => r.id === rideId);
    if (!ride || ride.available_seats <= 0) return;

    const { error } = await supabase
      .from('rides')
      .update({ available_seats: ride.available_seats - 1 })
      .eq('id', rideId);

    if (error) {
      console.error('Error updating seats:', error);
      toast({
        title: "Error",
        description: "Failed to claim seat. Please try again.",
        variant: "destructive",
      });
      return;
    }

    refetchRides();
    toast({
      title: "Success",
      description: "Seat claimed successfully!",
    });
  };

  const handleContactRequest = (driverId: number) => {
    const driver = taxiDrivers.find(d => d.id === driverId);
    if (driver) {
      toast({
        title: "Contact Information",
        description: `Driver's phone number: ${driver.phone_number}`,
      });
    }
  };

  const handleAddDriver = async (formData: any) => {
    const newDriver = {
      available_locations: formData.availableLocations.split(",").map((loc: string) => loc.trim()),
      available_hours: formData.availableHours,
      pricing_mechanism: formData.pricingMechanism,
      ...(formData.pricingMechanism === "perMile" ? { price_per_mile: formData.pricePerMile } : {}),
      ...(formData.pricingMechanism === "perTrip" ? {
        trip_pricing_type: formData.tripPricingType,
        trip_price: formData.tripPrice
      } : {}),
      accepted_payments: formData.acceptedPayments,
      phone_number: formData.phoneNumber,
    };

    const { error } = await supabase
      .from('taxi_drivers')
      .insert([newDriver]);

    if (error) {
      console.error('Error adding driver:', error);
      toast({
        title: "Error",
        description: "Failed to add driver listing. Please try again.",
        variant: "destructive",
      });
      return;
    }

    refetchDrivers();
    setIsAddDriverFormOpen(false);
    toast({
      title: "Success",
      description: "Driver listing added successfully!",
    });
  };
  
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
              id={ride.id}
              departureTime={ride.departure_time}
              startLocation={ride.start_location}
              endLocation={ride.end_location}
              availableSeats={ride.available_seats}
              womenOnly={ride.women_only}
              phoneNumber={ride.phone_number}
              passengerCanDrive={ride.passenger_can_drive}
              onSeatClaim={handleSeatClaim}
            />
          ))}
          {rides.length === 0 && (
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
