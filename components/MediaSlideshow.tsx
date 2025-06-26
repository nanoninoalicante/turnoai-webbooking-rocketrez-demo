import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  title?: string;
  duration?: string;
  poster?: string;
}

interface MediaSlideshowProps {
  title: string;
  badge?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const mediaItems: MediaItem[] = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Cycling on historic railway tracks',
    title: 'Historic Railway Adventure'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Group cycling through countryside',
    title: 'Beautiful Countryside Views'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1517654443271-18dcf89f4c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Historic train station ruins',
    title: 'Abandoned Railway Heritage'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1502780402662-acc01917fbb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Cyclists preparing for the journey',
    title: 'Getting Ready for Adventure'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1544191696-15693072e0f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Scenic railway bridge crossing',
    title: 'Historic Railway Bridges'
  }
];

export function MediaSlideshow({ title, badge, autoPlay = true, autoPlayInterval = 5000 }: MediaSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const currentItem = mediaItems[currentIndex];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, autoPlayInterval]);

  // Handle video ended event (if we add videos later)
  useEffect(() => {
    const video = videoRef.current;
    if (video && currentItem.type === 'video') {
      const handleEnded = () => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
      };
      
      video.addEventListener('ended', handleEnded);
      return () => video.removeEventListener('ended', handleEnded);
    }
  }, [currentIndex, currentItem.type]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div 
      className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Media Content */}
      {currentItem.type === 'image' ? (
        <ImageWithFallback
          src={currentItem.src}
          alt={currentItem.alt || title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
      ) : (
        <video
          ref={videoRef}
          src={currentItem.src}
          poster={currentItem.poster}
          className="w-full h-full object-cover"
          autoPlay={isPlaying}
          muted={isMuted}
          loop={false}
          playsInline
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-300 ${
          showControls ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}
        onClick={goToPrevious}
        aria-label="Previous media"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-300 ${
          showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
        onClick={goToNext}
        aria-label="Next media"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Media Controls */}
      <div className={`absolute top-4 right-4 flex items-center space-x-2 transition-all duration-300 ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}>
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        {currentItem.type === 'video' && (
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        {badge && (
          <Badge className="mb-3 bg-[#388D98] hover:bg-[#2f7a85]">{badge}</Badge>
        )}
        <h1 className="text-white text-2xl lg:text-3xl font-bold mb-3">{title}</h1>
        
        {/* Media Info and Controls */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3 text-white/90">
              <span className="text-sm font-medium">{currentItem.title}</span>
              {currentItem.type === 'video' && currentItem.duration && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                  {currentItem.duration}
                </span>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/80 transition-all duration-300 ease-out"
                style={{ width: `${((currentIndex + 1) / mediaItems.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Slide Indicators */}
          <div className="flex items-center space-x-2">
            {mediaItems.map((item, index) => (
              <button
                key={index}
                className={`relative w-12 h-8 rounded border-2 transition-all duration-300 overflow-hidden ${
                  index === currentIndex 
                    ? 'border-white scale-110' 
                    : 'border-white/50 hover:border-white/70 opacity-70 hover:opacity-90'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}: ${item.title}`}
              >
                <ImageWithFallback
                  src={item.src}
                  alt={item.alt || `Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Media Type Indicator */}
      <div className="absolute top-4 left-4">
        <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
          {currentItem.type === 'video' ? '🎥' : '📷'} {currentIndex + 1} of {mediaItems.length}
        </div>
      </div>
    </div>
  );
}