import CatGenerator from "../components/cat-generator";
import RecentGenerations from "../components/recent-generations";
import FeatureCards from "../components/feature-cards";
import FavoritesModal from "../components/favorites-modal";
import QRCodeModal from "../components/qr-code-modal";
import ModernCatIcon from "../components/modern-cat-icon";
import { Heart, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="font-ios bg-ios-gray min-h-screen md:bg-gradient-to-br md:from-blue-50 md:via-white md:to-purple-50">
      {/* Status Bar Spacer for iOS - Hidden on desktop */}
      <div className="h-11 bg-white transition-all-smooth md:hidden"></div>
      
      {/* Main Container - Responsive */}
      <div className="max-w-sm mx-auto bg-white min-h-screen md:max-w-4xl lg:max-w-6xl md:bg-transparent md:shadow-none lg:bg-transparent lg:shadow-none">
        {/* Header - Fixed and Responsive */}
        <header className="bg-white border-b border-gray-200 fixed top-11 left-0 right-0 z-50 max-w-sm mx-auto md:max-w-4xl lg:max-w-6xl slide-in-left md:top-0 md:shadow-md">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-ios-blue via-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg ios-button-scale slide-in-left animate-delay-100 relative overflow-hidden">
                <ModernCatIcon className="w-8 h-8" />
                {/* Subtle animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl animate-gradient opacity-30"></div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 slide-in-right animate-delay-200">Генератор Котиков</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* QR Code Button */}
              <QRCodeModal
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 rounded-full bg-ios-blue/10 hover:bg-ios-blue/20 p-0 ios-button-scale transition-all-smooth slide-in-right animate-delay-200 group"
                  >
                    <QrCode className="w-5 h-5 text-ios-blue transition-transform-smooth group-hover:scale-110" />
                  </Button>
                }
              />
              
              {/* Favorites Heart Button */}
              <FavoritesModal
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 p-0 ios-button-scale transition-all-smooth slide-in-right animate-delay-300 group"
                  >
                    <Heart className="w-5 h-5 text-red-500 transition-transform-smooth group-hover:scale-110 group-hover:fill-red-500" />
                  </Button>
                }
              />
            </div>
          </div>
        </header>

        {/* Main Content - Add top padding for fixed header and desktop layout */}
        <main className="px-4 py-6 space-y-6 pt-20 md:px-8 lg:px-12 md:pt-24 lg:pt-28">
          {/* Desktop Grid Layout */}
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 space-y-6">
            <div className="fade-in-up animate-delay-100 md:col-span-2 lg:col-span-2">
              <CatGenerator />
            </div>
            <div className="fade-in-up animate-delay-200 lg:col-span-1">
              <RecentGenerations />
            </div>
          </div>
          <div className="fade-in-up animate-delay-300 md:mt-8">
            <FeatureCards />
          </div>
          
          {/* Safe area bottom spacing */}
          <div className="h-20"></div>
        </main>

        {/* Enhanced Floating QR Code Button */}
        <div className="fixed bottom-8 right-4 z-50">
          <QRCodeModal
            trigger={
              <Button
                size="lg"
                className="w-14 h-14 bg-gradient-to-r from-ios-blue to-blue-600 hover:from-ios-blue/90 hover:to-blue-600/90 text-white rounded-full shadow-2xl p-0 ios-button-scale float-animation glow-effect transition-all-smooth group"
              >
                <QrCode className="w-6 h-6 transition-transform-smooth group-hover:scale-110 group-hover:rotate-12" />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
