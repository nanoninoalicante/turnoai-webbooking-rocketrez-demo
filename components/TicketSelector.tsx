import { useState } from "react";
import { Plus, Minus, Users, User, Baby } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface TicketSelectorProps {
  onTicketsChange: (tickets: { adults: number; youth: number; children: number }) => void;
}

export function TicketSelector({ onTicketsChange }: TicketSelectorProps) {
  const [tickets, setTickets] = useState({
    adults: 2,
    youth: 0,
    children: 0
  });

  const updateTickets = (type: 'adults' | 'youth' | 'children', change: number) => {
    const newTickets = {
      ...tickets,
      [type]: Math.max(0, tickets[type] + change)
    };
    setTickets(newTickets);
    onTicketsChange(newTickets);
  };

  const ticketTypes = [
    {
      key: 'adults' as const,
      icon: Users,
      title: 'Adults',
      subtitle: 'Age 18+',
      price: '$25.00',
      color: 'text-blue-600'
    },
    {
      key: 'youth' as const,
      icon: User,
      title: 'Youth',
      subtitle: 'Age 12-17',
      price: '$15.00',
      color: 'text-[#388D98]'
    },
    {
      key: 'children' as const,
      icon: Baby,
      title: 'Children',
      subtitle: 'Age 0-11',
      price: 'Free',
      color: 'text-purple-600'
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Select Tickets</h3>
        <div className="space-y-4">
          {ticketTypes.map(({ key, icon: Icon, title, subtitle, price, color }) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full bg-gray-100 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">{title}</div>
                  <div className="text-sm text-gray-500">{subtitle}</div>
                </div>
                <div className="font-semibold text-gray-900">{price}</div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateTickets(key, -1)}
                  disabled={tickets[key] === 0}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-medium">{tickets[key]}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateTickets(key, 1)}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}