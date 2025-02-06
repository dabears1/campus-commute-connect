
export type PaymentMethod = "Zelle" | "CashApp" | "PayPal" | "Venmo";

export interface TaxiDriver {
  id: number;
  availableLocations: string[];
  availableHours: string;
  pricePerMile: number;
  acceptedPayments: PaymentMethod[];
  phoneNumber: string;
}
