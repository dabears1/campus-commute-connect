import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function AddRideButton() {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate("/rides/new")}
      size="lg"
      className="gap-2"
    >
      <Plus className="w-5 h-5" />
      Add New Ride
    </Button>
  );
}