import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, DollarSign, MapPin, Users, Info } from "lucide-react";

export default function BookPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Booking Your Journey</h1>
        <p className="mt-4 text-lg text-muted-foreground">Finalize your details and secure your adventure.</p>
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
                            <Input id="travelers" type="number" placeholder="e.g., 2" defaultValue={2} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="date">Preferred Date</Label>
                            <Input id="date" type="date" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="special-needs">Special Needs or Requests</Label>
                        <Input id="special-needs" placeholder="e.g., dietary restrictions, accessibility needs" />
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
                <CardDescription>Your 4-day "Jerusalem Unveiled" journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Price (2 travelers)</span>
                  <span>$2,400</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span>$120</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$2,520</span>
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
