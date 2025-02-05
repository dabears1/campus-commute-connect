
export interface Ride {
  id: number;
  departureTime: string;
  startLocation: string;
  endLocation: string;
  availableSeats: number;
  womenOnly: boolean;
  direction: string;
  phoneNumber?: string;
}

export const MOCK_RIDES: Ride[] = [
  {
    id: 1,
    departureTime: "Today at 2:30 PM",
    startLocation: "Middlebury Campus",
    endLocation: "Burlington Airport",
    availableSeats: 3,
    womenOnly: false,
    direction: "leaving",
    phoneNumber: "802-555-0123"
  },
  {
    id: 2,
    departureTime: "Tomorrow at 9:00 AM",
    startLocation: "Albany Airport",
    endLocation: "Middlebury Campus",
    availableSeats: 2,
    womenOnly: true,
    direction: "arriving",
    phoneNumber: "802-555-0456"
  }
];
