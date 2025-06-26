import { useState } from "react";
import { Search, Filter, Clock, Users, MapPin, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Tour {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  groupSize: string;
  category: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  highlights: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
}

interface ToursProps {
  onTourSelect: (tourId: string) => void;
}

const tours: Tour[] = [
  {
    id: '1',
    title: 'Cycling on the Railways',
    location: 'Historic Railway District',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: 25.00,
    originalPrice: 35.00,
    duration: '3 hours',
    groupSize: 'Max 12',
    category: 'Adventure',
    difficulty: 'Easy',
    highlights: ['Historic railway routes', 'Scenic countryside', 'Expert guide'],
    isPopular: true,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Mountain Hiking Adventure',
    location: 'Alpine National Park',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: 45.00,
    duration: '6 hours',
    groupSize: 'Max 8',
    category: 'Hiking',
    difficulty: 'Challenging',
    highlights: ['Summit views', 'Wildlife spotting', 'Alpine flora'],
    isPopular: true
  },
  {
    id: '3',
    title: 'City Food Walking Tour',
    location: 'Downtown Historic District',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: 35.00,
    duration: '4 hours',
    groupSize: 'Max 15',
    category: 'Food & Culture',
    difficulty: 'Easy',
    highlights: ['Local tastings', 'Hidden gems', 'Cultural insights']
  },
  {
    id: '4',
    title: 'Kayaking River Adventure',
    location: 'Crystal River Valley',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: 55.00,
    duration: '5 hours',
    groupSize: 'Max 10',
    category: 'Water Sports',
    difficulty: 'Moderate',
    highlights: ['Scenic rapids', 'Wildlife viewing', 'Professional guide']
  },
  {
    id: '5',
    title: 'Photography Sunrise Tour',
    location: 'Scenic Overlook Points',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: 30.00,
    duration: '3 hours',
    groupSize: 'Max 6',
    category: 'Photography',
    difficulty: 'Easy',
    highlights: ['Golden hour shots', 'Pro tips', 'Stunning landscapes']
  },
  {
    id: '6',
    title: 'Wine Tasting Countryside',
    location: 'Vineyard Hills',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: 65.00,
    duration: '4 hours',
    groupSize: 'Max 12',
    category: 'Food & Culture',
    difficulty: 'Easy',
    highlights: ['Premium wines', 'Vineyard tour', 'Gourmet pairings'],
    isFeatured: true
  }
];

export function Tours({ onTourSelect }: ToursProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['all', 'Adventure', 'Hiking', 'Food & Culture', 'Water Sports', 'Photography'];
  const difficulties = ['all', 'Easy', 'Moderate', 'Challenging'];

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || tour.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
      default:
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Adventure tours landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Discover Amazing Adventures
            </h1>
            <p className="text-lg sm:text-xl mb-8 opacity-90">
              From cycling historic railways to mountain hikes, find your perfect adventure
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search tours, locations, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 h-14 text-black bg-white/95 backdrop-blur-sm border-0 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="price-low">Price: Low</SelectItem>
              <SelectItem value="price-high">Price: High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {sortedTours.length} tour{sortedTours.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTours.map(tour => (
          <Card key={tour.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
            <div className="relative overflow-hidden rounded-t-lg">
              <ImageWithFallback
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {tour.isFeatured && (
                  <Badge className="bg-[#388D98] hover:bg-[#2f7a85]">Featured</Badge>
                )}
                {tour.isPopular && (
                  <Badge variant="secondary">Popular</Badge>
                )}
              </div>

              {/* Price Badge */}
              <div className="absolute top-3 right-3">
                <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    {tour.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        ${tour.originalPrice}
                      </span>
                    )}
                    <span className="font-semibold text-[#388D98]">
                      ${tour.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Location */}
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {tour.location}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg group-hover:text-[#388D98] transition-colors">
                  {tour.title}
                </h3>

                {/* Rating */}


                {/* Details */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {tour.groupSize}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={
                      tour.difficulty === 'Easy' ? 'border-green-300 text-green-700' :
                      tour.difficulty === 'Moderate' ? 'border-yellow-300 text-yellow-700' :
                      'border-red-300 text-red-700'
                    }
                  >
                    {tour.difficulty}
                  </Badge>
                  <span className="text-sm text-[#388D98] font-medium">
                    {tour.category}
                  </span>
                </div>

                {/* Highlights */}
                <div className="space-y-1">
                  {tour.highlights.slice(0, 2).map((highlight, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#388D98] rounded-full mr-2"></div>
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white group/btn"
                  onClick={() => onTourSelect(tour.id)}
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedTours.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No tours found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}