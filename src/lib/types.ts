
export type PaymentMethod = "Zelle" | "CashApp" | "PayPal" | "Venmo";
export type PricingMechanism = "perMile" | "perTrip";
export type TripPricingType = "onePrice" | "perPerson";
export type RideDirection = "leaving" | "arriving";

export interface TaxiDriver {
  id: number;
  created_at: string;
  available_locations: string[];
  available_hours: string;
  pricing_mechanism: PricingMechanism;
  trip_pricing_type?: TripPricingType;
  price_per_mile?: number;
  trip_price?: number;
  accepted_payments: PaymentMethod[];
  phone_number: string;
}

export interface Ride {
  id: number;
  created_at: string;
  departure_time: string;
  start_location: string;
  end_location: string;
  available_seats: number;
  women_only: boolean;
  phone_number: string;
  passenger_can_drive: boolean;
  direction: RideDirection;
}

// Props interfaces
export interface RideCardProps {
  id: number;
  departureTime: string;
  startLocation: string;
  endLocation: string;
  availableSeats: number;
  womenOnly: boolean;
  phoneNumber: string;
  passengerCanDrive: boolean;
  onSeatClaim: (rideId: number) => void;
}

export interface TaxiDriverCardProps extends TaxiDriver {
  onContactRequest: (driverId: number) => void;
}
