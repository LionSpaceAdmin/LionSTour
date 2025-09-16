'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, Info, User, AlertTriangle, ArrowRight } from "lucide-react";
import type { Itinerary } from "@/ai/flows/concierge-service";
import { useRouter } from "next/navigation";

// Define a type that includes the traveler count
type ItineraryWithTravelers = Itinerary & {
  travelerCount: number;
};

export default function BookPage() {
  const [bookingDetails, setBookingDetails] = useState<ItineraryWithTravelers | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedItinerary = localStorage.getItem('tripItinerary');
    if (storedItinerary) {
      try {
        const parsedDetails: ItineraryWithTravelers = JSON.parse(storedItinerary);
        setBookingDetails(parsedDetails);
      } catch (error) {
        console.error("Failed to parse itinerary from localStorage", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Skeleton className="h-[500px] w-full" />
            </div>
            <div className="lg:col-span-1">
                <Skeleton className="h-[300px] w-full" />
            </div>
        </div>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-24 text-center">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <div className="mx-auto bg-destructive/20 rounded-full p-3 w-fit">
                        <AlertTriangle className="w-10 h-10 text-destructive" />
                    </div>
                    <CardTitle className="mt-4">No Booking Details Found</CardTitle>
                    <CardDescription>
                        It looks like you haven't planned a trip yet. Please go to the planning page to create your custom itinerary first.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full" onClick={() => router.push('/plan')}>
                        Plan Your Journey
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  const { itinerary, summary, travelerCount, totalCost } = {
      itinerary: bookingDetails,
      summary: `Your ${bookingDetails.days.length}-day custom journey.`,
      travelerCount: bookingDetails.travelerCount,
      totalCost: bookingDetails.totalCost,
  };
  
  const guideName = itinerary.guide?.name || 'Your Assigned Guide';
  const taxRate = 0.05; // 5% tax
  const taxes = totalCost * taxRate;
  const finalTotal = totalCost + taxes;


  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Booking Your Journey</h1>
        <p className="mt-4 text-lg text-muted-foreground">Finalize your details and secure your adventure with {guideName}.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Booking Form */}
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Your Details</CardTitle>
                    <CardDescription>Please provide the necessary information to complete your booking.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="travelers">Number of Travelers</Label>
                            <div className="relative">
                                <Input id="travelers" type="number" value={travelerCount} readOnly className="font-bold" />
                                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="date">Preferred Start Date</Label>
                            <Input id="date" type="date" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="special-requests">Special Needs or Requests</Label>
                        <Input id="special-requests" placeholder="e.g., dietary restrictions, accessibility needs" />
                    </div>
                     <Separator />
                     <div>
                        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <div className="relative">
                                    <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                </div>
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM / YY" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="•••" />
                                </div>
                            </div>
                        </div>
                     </div>
                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full">
                        Confirm & Book Now
                    </Button>
                </CardFooter>
            </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
                <CardDescription>{summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Price ({travelerCount} travelers)</span>
                  <span>${totalCost.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 border-primary/30">
                <CardHeader className="flex-row items-center gap-4">
                    <Info className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-base font-semibold">Peace of Mind</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>✓ Full refund if you cancel up to 7 days before the trip.</p>
                    <p>✓ 24/7 support during your journey.</p>
                    <p>✓ All guides are verified and insured.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
