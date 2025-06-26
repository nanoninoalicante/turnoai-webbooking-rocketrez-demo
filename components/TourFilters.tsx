import { useState } from "react";
import { Filter, X, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface TourFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  categories: string[];
  difficulties: string[];
  priceRange: [number, number];
  duration: string[];
  groupSize: string[];
}

const categoryOptions = [
  { id: 'adventure', label: 'Adventure' },
  { id: 'hiking', label: 'Hiking' },
  { id: 'food-culture', label: 'Food & Culture' },
  { id: 'water-sports', label: 'Water Sports' },
  { id: 'photography', label: 'Photography' }
];

const difficultyOptions = [
  { id: 'easy', label: 'Easy', color: 'text-green-700 border-green-300' },
  { id: 'moderate', label: 'Moderate', color: 'text-yellow-700 border-yellow-300' },
  { id: 'challenging', label: 'Challenging', color: 'text-red-700 border-red-300' }
];

const durationOptions = [
  { id: 'short', label: 'Short (1-3 hours)' },
  { id: 'half-day', label: 'Half Day (3-6 hours)' },
  { id: 'full-day', label: 'Full Day (6+ hours)' }
];

const groupSizeOptions = [
  { id: 'intimate', label: 'Intimate (1-6 people)' },
  { id: 'small', label: 'Small (7-12 people)' },
  { id: 'large', label: 'Large (13+ people)' }
];

export function TourFilters({ isOpen, onClose, onFiltersChange, currentFilters }: TourFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...localFilters.categories, categoryId]
      : localFilters.categories.filter(c => c !== categoryId);
    
    const newFilters = { ...localFilters, categories: newCategories };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDifficultyChange = (difficultyId: string, checked: boolean) => {
    const newDifficulties = checked
      ? [...localFilters.difficulties, difficultyId]
      : localFilters.difficulties.filter(d => d !== difficultyId);
    
    const newFilters = { ...localFilters, difficulties: newDifficulties };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    const newFilters = { ...localFilters, priceRange: range };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDurationChange = (durationId: string, checked: boolean) => {
    const newDuration = checked
      ? [...localFilters.duration, durationId]
      : localFilters.duration.filter(d => d !== durationId);
    
    const newFilters = { ...localFilters, duration: newDuration };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleGroupSizeChange = (sizeId: string, checked: boolean) => {
    const newGroupSize = checked
      ? [...localFilters.groupSize, sizeId]
      : localFilters.groupSize.filter(s => s !== sizeId);
    
    const newFilters = { ...localFilters, groupSize: newGroupSize };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      difficulties: [],
      priceRange: [0, 100],
      duration: [],
      groupSize: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return localFilters.categories.length + 
           localFilters.difficulties.length + 
           localFilters.duration.length + 
           localFilters.groupSize.length +
           (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 100 ? 1 : 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
        <Card className="border-0 rounded-none h-full">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <h3 className="font-semibold">Filters</h3>
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Categories */}
            <div>
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {categoryOptions.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={localFilters.categories.includes(category.id)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category.id, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={category.id}
                      className="text-sm cursor-pointer"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Difficulty */}
            <div>
              <h4 className="font-medium mb-3">Difficulty</h4>
              <div className="space-y-2">
                {difficultyOptions.map(difficulty => (
                  <div key={difficulty.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={difficulty.id}
                      checked={localFilters.difficulties.includes(difficulty.id)}
                      onCheckedChange={(checked) => 
                        handleDifficultyChange(difficulty.id, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={difficulty.id}
                      className="text-sm cursor-pointer"
                    >
                      <Badge variant="outline" className={difficulty.color}>
                        {difficulty.label}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-4">
                <Slider
                  value={localFilters.priceRange}
                  onValueChange={(value) => handlePriceRangeChange(value as [number, number])}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>${localFilters.priceRange[0]}</span>
                  <span>${localFilters.priceRange[1]}+</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Duration */}
            <div>
              <h4 className="font-medium mb-3">Duration</h4>
              <div className="space-y-2">
                {durationOptions.map(duration => (
                  <div key={duration.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={duration.id}
                      checked={localFilters.duration.includes(duration.id)}
                      onCheckedChange={(checked) => 
                        handleDurationChange(duration.id, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={duration.id}
                      className="text-sm cursor-pointer"
                    >
                      {duration.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Group Size */}
            <div>
              <h4 className="font-medium mb-3">Group Size</h4>
              <div className="space-y-2">
                {groupSizeOptions.map(size => (
                  <div key={size.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={size.id}
                      checked={localFilters.groupSize.includes(size.id)}
                      onCheckedChange={(checked) => 
                        handleGroupSizeChange(size.id, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={size.id}
                      className="text-sm cursor-pointer"
                    >
                      {size.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={clearAllFilters}
              className="w-full"
              disabled={getActiveFilterCount() === 0}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}