
import { DirectionCard } from "@/components/DirectionCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-4xl font-bold text-primary">MiddRideBoard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">How MiddRideBoard Works</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">How MiddRideBoard Works</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-left">
                <p>
                  MiddRideBoard helps Middlebury students find or offer rides to and from campus. 
                  Choose if you're 'Leaving Campus' or 'Getting to Campus' to see available rides. 
                  You can also add your own ride by clicking '+ Add New Ride.'
                </p>
                <p>
                  Phone numbers are hidden until a ride is claimed. Once claimed, the driver's 
                  number is revealed, and passengers are expected to text the driver to confirm. 
                  Rides are automatically removed 24 hours after the scheduled time to keep the 
                  board updated.
                </p>
                <div className="space-y-2">
                  <h3 className="font-semibold">Passenger Driving Option</h3>
                  <p>
                    When adding a ride, drivers can indicate if they're open to passengers 
                    driving part of the way.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">MiddTaxi</h3>
                  <p>
                    A separate feature where students can offer taxi-like rides or request to be 
                    driven somewhere, with flexible pricing and payment options.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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
