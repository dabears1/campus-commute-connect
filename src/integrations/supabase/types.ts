export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      rides: {
        Row: {
          available_seats: number
          created_at: string
          departure_time: string
          direction: Database["public"]["Enums"]["ride_direction"]
          end_location: string
          id: number
          passenger_can_drive: boolean
          phone_number: string
          start_location: string
          women_only: boolean
        }
        Insert: {
          available_seats: number
          created_at?: string
          departure_time: string
          direction: Database["public"]["Enums"]["ride_direction"]
          end_location: string
          id?: number
          passenger_can_drive?: boolean
          phone_number: string
          start_location: string
          women_only?: boolean
        }
        Update: {
          available_seats?: number
          created_at?: string
          departure_time?: string
          direction?: Database["public"]["Enums"]["ride_direction"]
          end_location?: string
          id?: number
          passenger_can_drive?: boolean
          phone_number?: string
          start_location?: string
          women_only?: boolean
        }
        Relationships: []
      }
      taxi_drivers: {
        Row: {
          accepted_payments: Database["public"]["Enums"]["payment_method"][]
          available_hours: string
          available_locations: string[]
          created_at: string
          id: number
          phone_number: string
          price_per_mile: number | null
          pricing_mechanism: Database["public"]["Enums"]["pricing_mechanism"]
          trip_price: number | null
          trip_pricing_type:
            | Database["public"]["Enums"]["trip_pricing_type"]
            | null
        }
        Insert: {
          accepted_payments: Database["public"]["Enums"]["payment_method"][]
          available_hours: string
          available_locations: string[]
          created_at?: string
          id?: number
          phone_number: string
          price_per_mile?: number | null
          pricing_mechanism: Database["public"]["Enums"]["pricing_mechanism"]
          trip_price?: number | null
          trip_pricing_type?:
            | Database["public"]["Enums"]["trip_pricing_type"]
            | null
        }
        Update: {
          accepted_payments?: Database["public"]["Enums"]["payment_method"][]
          available_hours?: string
          available_locations?: string[]
          created_at?: string
          id?: number
          phone_number?: string
          price_per_mile?: number | null
          pricing_mechanism?: Database["public"]["Enums"]["pricing_mechanism"]
          trip_price?: number | null
          trip_pricing_type?:
            | Database["public"]["Enums"]["trip_pricing_type"]
            | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_expired_rides: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      payment_method: "Zelle" | "CashApp" | "PayPal" | "Venmo"
      pricing_mechanism: "perMile" | "perTrip"
      ride_direction: "leaving" | "arriving"
      trip_pricing_type: "onePrice" | "perPerson"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
