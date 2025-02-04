import { DirectionCard } from "@/components/DirectionCard";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-primary">MiddRideBoard</h1>
        <p className="text-lg text-muted-foreground">Find or offer rides to and from campus</p>
      </div>
      
      <div className="w-full max-w-md space-y-4">
        <DirectionCard
          title="Leaving Campus"
          direction="leaving"
        />
        <DirectionCard
          title="Getting to Campus"
          direction="arriving"
        />
      </div>
    </div>
  );
}