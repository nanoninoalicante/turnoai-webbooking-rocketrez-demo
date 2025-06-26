import { Phone, Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  currentPage?: 'tours' | 'tour-detail';
  onNavigateToTours?: () => void;
}

const AdventureLogo = () => (
  <div className="relative">
    <svg
      width="44"
      height="36"
      viewBox="0 0 44 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-11 h-9"
    >
      {/* Background circle */}
      <circle
        cx="22"
        cy="18"
        r="17"
        fill="#f0f9fa"
        stroke="#388D98"
        strokeWidth="1"
        className="fill-[#f0f9fa] stroke-[#388D98]"
      />
      
      {/* Mountain silhouette */}
      <path
        d="M8 24L13 14L18 20L23 12L28 22L36 24H8Z"
        fill="#388D98"
        className="fill-[#388D98]"
      />
      <path
        d="M6 26L11 16L16 22L21 14L26 24L34 26H6Z"
        fill="#2f7a85"
        className="fill-[#2f7a85]"
        opacity="0.7"
      />
      
      {/* Winding trail */}
      <path
        d="M8 28C10 26.5 12 26.5 14 28C16 29.5 18 29.5 20 28C22 26.5 24 26.5 26 28C28 29.5 30 29.5 32 28C34 26.5 36 26.5 36 28"
        stroke="#388D98"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2,1"
        fill="none"
        className="stroke-[#388D98]"
        opacity="0.8"
      />
      
      {/* Sun with rays */}
      <circle
        cx="30"
        cy="12"
        r="2.5"
        fill="#FFA500"
        className="fill-yellow-500"
      />
      <g stroke="#FFA500" strokeWidth="1" strokeLinecap="round" className="stroke-yellow-500" opacity="0.8">
        <path d="M30 8V9.5" />
        <path d="M30 14.5V16" />
        <path d="M26 12H27.5" />
        <path d="M32.5 12H34" />
        <path d="M27.2 9.2L28.3 10.3" />
        <path d="M31.7 13.7L32.8 14.8" />
        <path d="M32.8 9.2L31.7 10.3" />
        <path d="M28.3 13.7L27.2 14.8" />
      </g>
      
      {/* Small birds or navigation elements */}
      <g fill="#2f7a85" className="fill-[#2f7a85]" opacity="0.6">
        <path d="M14 10C14.5 9.5 15 9.5 15.5 10C15 10.5 14.5 10.5 14 10Z" />
        <path d="M18 8C18.5 7.5 19 7.5 19.5 8C19 8.5 18.5 8.5 18 8Z" />
      </g>
    </svg>
  </div>
);

export function Header({ currentPage = 'tours', onNavigateToTours }: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button 
              onClick={onNavigateToTours}
              className="flex items-center space-x-3 hover:opacity-90 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <AdventureLogo />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900 leading-tight">Adventure</span>
                <span className="font-semibold text-sm text-[#388D98] leading-tight tracking-wide">TOURS</span>
              </div>
            </button>

          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="tel:+1-555-123-4567" 
              className="flex items-center space-x-2 text-[#388D98] hover:text-[#2f7a85] transition-colors hidden sm:flex group"
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 leading-tight">Call for bookings</span>
                <span className="font-semibold leading-tight">(555) 123-4567</span>
              </div>
            </a>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}