
export type PaymentMethod = "Zelle" | "CashApp" | "PayPal" | "Venmo";

export type PricingMechanism = "perMile" | "perTrip";
export type TripPricingType = "onePrice" | "perPerson";

export interface TaxiDriver {
  id: number;
  availableLocations: string[];
  availableHours: string;
  pricingMechanism: PricingMechanism;
  tripPricingType?: TripPricingType;
  pricePerMile?: number;
  tripPrice?: number;
  acceptedPayments: PaymentMethod[];
  phoneNumber: string;
}

