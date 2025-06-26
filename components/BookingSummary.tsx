import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";

interface BookingSummaryProps {
  selectedDate?: Date;
  selectedTime?: string;
  tickets: { adults: number; youth: number; children: number };
  basePrice: number;
  onCheckout: () => void;
}

export function BookingSummary({ selectedDate, selectedTime, tickets, basePrice, onCheckout }: BookingSummaryProps) {
  const adultPrice = basePrice;
  const youthPrice = basePrice * 0.6; // 60% of adult price
  const childrenPrice = 0;

  const subtotal = (tickets.adults * adultPrice) + (tickets.youth * youthPrice) + (tickets.children * childrenPrice);
  const total = subtotal;

  const totalGuests = tickets.adults + tickets.youth + tickets.children;
  const isComplete = selectedDate && selectedTime && totalGuests > 0;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <h3 className="text-lg font-semibold">Booking Summary</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedDate && (
          <div className="flex items-center space-x-3 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        )}

        {selectedTime && (
          <div className="flex items-center space-x-3 text-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>
              {selectedTime === '9:00' ? '9:00 AM' :
               selectedTime === '11:30' ? '11:30 AM' :
               selectedTime === '14:00' ? '2:00 PM' :
               selectedTime === '16:30' ? '4:30 PM' : selectedTime}
            </span>
          </div>
        )}

        {totalGuests > 0 && (
          <div className="flex items-center space-x-3 text-sm">
            <Users className="w-4 h-4 text-gray-500" />
            <span>{totalGuests} guest{totalGuests !== 1 ? 's' : ''}</span>
          </div>
        )}

        {totalGuests > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              {tickets.adults > 0 && (
                <div className="flex justify-between text-sm">
                  <span>{tickets.adults} Adult{tickets.adults !== 1 ? 's' : ''} × ${adultPrice.toFixed(2)}</span>
                  <span>${(tickets.adults * adultPrice).toFixed(2)}</span>
                </div>
              )}
              {tickets.youth > 0 && (
                <div className="flex justify-between text-sm">
                  <span>{tickets.youth} Youth × ${youthPrice.toFixed(2)}</span>
                  <span>${(tickets.youth * youthPrice).toFixed(2)}</span>
                </div>
              )}
              {tickets.children > 0 && (
                <div className="flex justify-between text-sm">
                  <span>{tickets.children} Child{tickets.children !== 1 ? 'ren' : ''} × Free</span>
                  <span>$0.00</span>
                </div>
              )}
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </>
        )}

        <Button 
          className="w-full bg-black hover:bg-gray-800 text-white" 
          size="lg"
          onClick={onCheckout}
          disabled={!isComplete}
        >
          {isComplete ? 'Checkout' : 'Complete Booking Details'}
        </Button>

        {!isComplete && (
          <p className="text-xs text-gray-500 text-center">
            Please select date, time, and tickets to continue
          </p>
        )}
      </CardContent>
    </Card>
  );
}