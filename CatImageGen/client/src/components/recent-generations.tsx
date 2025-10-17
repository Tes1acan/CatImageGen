import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart } from "lucide-react";
import type { CatImage } from "@shared/schema";

export default function RecentGenerations() {
  const { data: images, isLoading } = useQuery<CatImage[]>({
    queryKey: ["/api/cat-images"],
  });

  const recentImages = images?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between fade-in-up">
          <h3 className="text-lg font-bold text-gray-900">Недавние Котики</h3>
          <Button variant="ghost" size="sm" className="text-ios-blue font-medium">
            Все
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1 lg:grid-cols-2 stagger-children">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <Skeleton className="w-full h-32 shimmer" />
              <div className="p-3">
                <Skeleton className="h-4 w-20 mb-1 shimmer" />
                <Skeleton className="h-3 w-16 shimmer" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Недавние Котики</h3>
        </div>
        
        <Card className="bg-white rounded-2xl shadow-md p-6 text-center">
          <div className="text-gray-500">
            <div className="text-4xl mb-2">🐾</div>
            <p className="text-sm">Котики еще не созданы</p>
            <p className="text-xs text-gray-400 mt-1">Создайте своего первого очаровательного котика!</p>
          </div>
        </Card>
      </div>
    );
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Только что";
    if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ч назад`;
    return "Вчера";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between slide-in-left">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 transition-spring">Недавние Котики 🐾</h3>
        {images.length > 4 && (
          <Button variant="ghost" size="sm" className="text-ios-blue font-medium ios-button-scale glow-effect transition-spring slide-in-right animate-delay-100 ripple-effect" data-testid="button-view-all">
            Все
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3 md:grid-cols-1 lg:grid-cols-2">
        {recentImages.map((image, index) => (
          <Card
            key={image.id}
            data-testid={`card-recent-cat-${image.id}`}
            className={`bg-white rounded-2xl shadow-md overflow-hidden ios-button-scale cursor-pointer hover:shadow-2xl transition-spring scale-in group hover-lift animate-delay-${(index + 1) * 50}`}
          >
            <div className="relative overflow-hidden">
              <img
                src={image.thumbnailUrl || image.imageUrl}
                alt={image.title}
                className="w-full h-32 object-cover transition-spring group-hover:scale-125 group-hover:rotate-2"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-spring"></div>
              
              {/* Floating like indicator */}
              {image.liked && (
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 scale-in animate-delay-200">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                </div>
              )}
            </div>
            <div className="p-3 transition-spring group-hover:bg-gradient-to-br group-hover:from-ios-blue/5 group-hover:to-purple-50">
              <p className="text-sm font-medium text-gray-900 truncate transition-spring group-hover:text-ios-blue group-hover:translate-x-1" data-testid={`text-cat-title-${image.id}`}>{image.title}</p>
              <p className="text-xs text-gray-500 transition-spring group-hover:text-gray-700">
                {formatTimeAgo(new Date(image.createdAt!))} ⏰
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}