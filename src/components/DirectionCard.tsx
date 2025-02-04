import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface DirectionCardProps {
  title: string;
  direction: "leaving" | "arriving";
}

export function DirectionCard({ title, direction }: DirectionCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="p-6 hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => navigate(`/rides/${direction}`)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  );
}