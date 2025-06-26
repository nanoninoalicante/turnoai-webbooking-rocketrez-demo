import { useState } from "react";
import { Header } from "./components/Header";
import { Tours } from "./components/Tours";
import { TourDetails } from "./components/TourDetails";
import { TicketSelector } from "./components/TicketSelector";
import { DatePicker } from "./components/DatePicker";
import { TimeSlotPicker } from "./components/TimeSlotPicker";
import { BookingSummary } from "./components/BookingSummary";
import { RelatedTours } from "./components/RelatedTours";

type Page = 'tours' | 'tour-detail';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('tours');
  const [selectedTourId, setSelectedTourId] = useState<string>('1');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedPrice, setSelectedPrice] = useState<number>(25.00);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [tickets, setTickets] = useState({
    adults: 2,
    youth: 0,
    children: 0
  });

  const handleDateSelect = (date: Date, price: number) => {
    setSelectedDate(date);
    setSelectedPrice(price);
    setShowTimeSlots(true);
    // Reset time selection when date changes
    setSelectedTime(undefined);
  };

  const handleBackToDate = () => {
    setShowTimeSlots(false);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout! This would integrate with a payment system.");
  };

  const handleTourSelect = (tourId: string) => {
    setSelectedTourId(tourId);
    setCurrentPage('tour-detail');
    // Reset booking state when switching tours
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setShowTimeSlots(false);
    setTickets({ adults: 2, youth: 0, children: 0 });
  };

  const handleBackToTours = () => {
    setCurrentPage('tours');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage}
        onNavigateToTours={handleBackToTours}
      />
      
      {currentPage === 'tours' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tours onTourSelect={handleTourSelect} />
        </main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={handleBackToTours}
              className="flex items-center text-[#388D98] hover:text-[#2f7a85] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tours
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <TourDetails />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <TicketSelector onTicketsChange={setTickets} />
              
              {!showTimeSlots ? (
                <DatePicker 
                  onDateSelect={handleDateSelect} 
                  selectedDate={selectedDate}
                />
              ) : (
                <TimeSlotPicker 
                  onTimeSelect={setSelectedTime}
                  selectedTime={selectedTime}
                  selectedDate={selectedDate}
                  onBack={handleBackToDate}
                />
              )}
              
              <BookingSummary
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                tickets={tickets}
                basePrice={selectedPrice}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </main>
      )}

      {/* Related Tours Section - only show on tour detail page */}
      {currentPage === 'tour-detail' && <RelatedTours />}
    </div>
  );
}