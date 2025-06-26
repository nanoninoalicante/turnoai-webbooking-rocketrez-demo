import { MapPin, Clock, Users, Info } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { MediaSlideshow } from "./MediaSlideshow";

export function TourDetails() {
  return (
    <div className="space-y-6">
      {/* Media Slideshow */}
      <MediaSlideshow 
        title="Cycling on the Railways"
        badge="Adventure Tour"
        autoPlay={true}
        autoPlayInterval={6000}
      />

      {/* Quick Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-[#388D98] mx-auto mb-2" />
            <div className="text-sm font-medium">Duration</div>
            <div className="text-xs text-gray-500">3 hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium">Group Size</div>
            <div className="text-xs text-gray-500">Max 12</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-sm font-medium">Difficulty</div>
            <div className="text-xs text-gray-500">Easy</div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4">About This Experience</h3>
          <p className="text-gray-600 mb-4">
            Railway closures, abandoned stations were created in the mid-19th century as a way for railway workers to 
            inspect and maintain the tracks. Today, old lines are popular for recreational cycling, allowing people to explore scenic 
            routes and abandoned railway infrastructure that are no longer in use by trains.
          </p>
          <p className="text-gray-600">
            During this 3-hour cycling experience, you'll follow vintage railway routes through beautiful countryside, 
            discovering hidden gems and hearing stories about the area's rich railway heritage.
          </p>
        </CardContent>
      </Card>

      {/* What's Included */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">What's Included</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#388D98] rounded-full"></div>
              <span>High-quality bicycle rental</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#388D98] rounded-full"></div>
              <span>Safety helmet and equipment</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#388D98] rounded-full"></div>
              <span>Expert local guide</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#388D98] rounded-full"></div>
              <span>Light refreshments</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Important Info */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 mb-2">Important Information</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Please wear comfortable clothes and closed-toe shoes</li>
                <li>• Minimum age is 12 years old</li>
                <li>• Tours may be cancelled due to weather conditions</li>
                <li>• Free cancellation up to 24 hours before the tour</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}