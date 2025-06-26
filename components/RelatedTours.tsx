import { MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Tour {
  id: number;
  title: string;
  location: string;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice?: number;
  image: string;
  badges: string[];
}

const relatedTours: Tour[] = [
  {
    id: 1,
    title: "Seine River Evening Cruise with Dinner",
    location: "Paris, France",
    duration: "3 hours",
    groupSize: "Up to 100",
    price: 85,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
    badges: ["Popular", "Evening"]
  },
  {
    id: 2,
    title: "Louvre Museum Skip-the-Line Tour",
    location: "Paris, France", 
    duration: "2.5 hours",
    groupSize: "Up to 25",
    price: 65,
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&h=600&fit=crop",
    badges: ["Skip-the-line", "Art"]
  },
  {
    id: 3,
    title: "Montmartre Walking Tour & Sacré-Cœur",
    location: "Paris, France",
    duration: "3.5 hours", 
    groupSize: "Up to 15",
    price: 45,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    badges: ["Walking", "Historic"]
  },
  {
    id: 4,
    title: "Versailles Palace Day Trip from Paris",
    location: "Versailles, France",
    duration: "8 hours",
    groupSize: "Up to 30",
    price: 95,
    originalPrice: 130,
    image: "https://images.unsplash.com/photo-1651137807327-8e1e6e6bb57b?w=800&h=600&fit=crop",
    badges: ["Day Trip", "Palace"]
  },
  {
    id: 5,
    title: "Paris Food Tour: Tastes of Le Marais",
    location: "Paris, France",
    duration: "4 hours",
    groupSize: "Up to 12",
    price: 75,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    badges: ["Food", "Small Group"]
  }
];

export function RelatedTours() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">You might also like</h3>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              <CarouselPrevious className="relative static translate-y-0" />
              <CarouselNext className="relative static translate-y-0" />
            </div>
          </div>
          
          <CarouselContent className="-ml-2 md:-ml-4">
            {relatedTours.map((tour) => (
              <CarouselItem key={tour.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <ImageWithFallback
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {tour.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="bg-white/90 text-gray-800 text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className="font-medium line-clamp-2 mb-1">{tour.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{tour.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>



                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">${tour.price}</span>
                        {tour.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">${tour.originalPrice}</span>
                        )}
                      </div>
                      <Button size="sm" variant="outline" className="text-sm">
                        View Tour
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}