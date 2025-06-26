import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface DateData {
  day: number;
  price: number;
  availability: 'standard' | 'premium' | 'high-demand' | 'unavailable';
  available: boolean;
}

interface DatePickerProps {
  onDateSelect: (date: Date, price: number) => void;
  selectedDate?: Date;
}

export function DatePicker({ onDateSelect, selectedDate }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)); // June 2025

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = [
    { short: 'Mon', full: 'Monday' },
    { short: 'Tue', full: 'Tuesday' },
    { short: 'Wed', full: 'Wednesday' },
    { short: 'Thu', full: 'Thursday' },
    { short: 'Fri', full: 'Friday' },
    { short: 'Sat', full: 'Saturday' },
    { short: 'Sun', full: 'Sunday' }
  ];

  // Dynamic pricing data for June 2025
  const dateData: Record<number, DateData> = {
    11: { day: 11, price: 40.00, availability: 'premium', available: true },
    12: { day: 12, price: 40.00, availability: 'premium', available: true },
    13: { day: 13, price: 40.00, availability: 'premium', available: true },
    14: { day: 14, price: 50.00, availability: 'high-demand', available: true },
    15: { day: 15, price: 45.00, availability: 'premium', available: true },
    16: { day: 16, price: 50.00, availability: 'high-demand', available: false },
    18: { day: 18, price: 40.00, availability: 'standard', available: true },
    19: { day: 19, price: 40.00, availability: 'premium', available: true },
    20: { day: 20, price: 40.00, availability: 'standard', available: true },
    21: { day: 21, price: 40.00, availability: 'standard', available: true },
    22: { day: 22, price: 40.00, availability: 'standard', available: true },
    23: { day: 23, price: 40.00, availability: 'standard', available: true },
    25: { day: 25, price: 40.00, availability: 'standard', available: true },
    26: { day: 26, price: 40.00, availability: 'premium', available: true },
    27: { day: 27, price: 40.00, availability: 'standard', available: true },
    28: { day: 28, price: 40.00, availability: 'standard', available: true },
    30: { day: 30, price: 40.00, availability: 'premium', available: true },
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const today = new Date();

  const getAvailabilityCircleClasses = (availability: string, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-blue-600 text-white';
    }
    
    switch (availability) {
      case 'standard':
        return 'bg-[#f0f9fa] text-[#388D98]';
      case 'premium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high-demand':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-400';
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-full aspect-square"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayData = dateData[day];
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth.getMonth() &&
        selectedDate.getFullYear() === currentMonth.getFullYear();
      const isPast = date < today;
      const isAvailable = dayData?.available && !isPast;
      
      days.push(
        <div key={`day-${day}`} className="w-full aspect-square">
          <button
            onClick={() => isAvailable && dayData && onDateSelect(date, dayData.price)}
            disabled={!isAvailable}
            className={`
              w-full h-full p-2 transition-all duration-200 flex flex-col items-center justify-center
              ${isAvailable ? 'hover:scale-105' : 'cursor-not-allowed'}
            `}
          >
            {/* Day number in colored circle */}
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mb-1
              ${dayData && isAvailable 
                ? getAvailabilityCircleClasses(dayData.availability, isSelected)
                : 'text-gray-300'
              }
            `}>
              {day}
            </div>
            
            {/* Price */}
            {dayData && isAvailable && (
              <div className={`text-xs ${
                isSelected 
                  ? 'text-blue-600' 
                  : 'text-gray-500'
              }`}>
                ${dayData.price.toFixed(2)}
              </div>
            )}
          </button>
        </div>
      );
    }
    
    return days;
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day, index) => (
            <div key={`dayname-${index}-${day.full}`} className="h-8 flex items-center justify-center text-sm text-gray-500">
              {day.short}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </CardContent>
    </Card>
  );
}