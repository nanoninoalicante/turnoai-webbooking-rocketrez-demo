import { useState } from "react";
import { Clock, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface TimeSlotPickerProps {
  onTimeSelect: (time: string) => void;
  selectedTime?: string;
  selectedDate?: Date;
  onBack?: () => void;
}

export function TimeSlotPicker({ onTimeSelect, selectedTime, selectedDate, onBack }: TimeSlotPickerProps) {
  const timeSlots = [
    { time: '9:00', label: '9:00 AM', available: true },
    { time: '11:30', label: '11:30 AM', available: true },
    { time: '14:00', label: '2:00 PM', available: false },
    { time: '16:30', label: '4:30 PM', available: true },
  ];

  if (!selectedDate) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Please select a date first</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-1 h-8 w-8"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Choose a Time</h3>
            <p className="text-sm text-gray-500">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {timeSlots.map(({ time, label, available }) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              onClick={() => available && onTimeSelect(time)}
              disabled={!available}
              className={`
                h-12 flex items-center justify-center space-x-2 transition-all duration-200
                ${selectedTime === time 
                  ? 'bg-black hover:bg-gray-800 text-white' 
                  : available 
                    ? 'hover:bg-[#f0f9fa] hover:border-[#388D98]' 
                    : 'opacity-50 cursor-not-allowed'
                }
              `}
            >
              <Clock className="w-4 h-4" />
              <span>{label}</span>
            </Button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <span className="inline-block w-3 h-3 bg-gray-300 rounded mr-2"></span>
          Unavailable times are shown in gray
        </div>
      </CardContent>
    </Card>
  );
}