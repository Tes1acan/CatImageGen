import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Share, Download, Heart, RefreshCw } from "lucide-react";
import type { CatImage } from "@shared/schema";

export default function CatGenerator() {
  const [currentImage, setCurrentImage] = useState<CatImage | null>(null);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/cat-images/generate");
      return response.json();
    },
    onSuccess: (data: CatImage) => {
      setCurrentImage(data);
      queryClient.invalidateQueries({ queryKey: ["/api/cat-images"] });
      toast({
        title: "Новый котик создан!",
        description: "Ваш очаровательный котик готов к просмотру.",
      });
    },
    onError: (error) => {
      toast({
        title: "Ошибка генерации",
        description: error instanceof Error ? error.message : "Не удалось создать изображение котика",
        variant: "destructive",
      });
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (imageId: string) => {
      const response = await apiRequest("PATCH", `/api/cat-images/${imageId}`, {
        liked: !currentImage?.liked,
      });
      return response.json();
    },
    onSuccess: (data: CatImage) => {
      setCurrentImage(data);
      queryClient.invalidateQueries({ queryKey: ["/api/cat-images"] });
      setLikeAnimation(true);
      setTimeout(() => setLikeAnimation(false), 600);
      if (data.liked) {
        toast({
          title: "❤️ Котик понравился!",
          description: "Добавлен в избранное",
        });
      }
    },
  });

  const handleShare = async () => {
    if (!currentImage) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: "Посмотри на этого очаровательного котика!",
          url: currentImage.imageUrl,
        });
      } catch (error) {
        console.log("Отмена поделиться");
      }
    } else {
      navigator.clipboard.writeText(currentImage.imageUrl);
      toast({
        title: "Ссылка скопирована!",
        description: "URL изображения скопирован в буфер обмена.",
      });
    }
  };

  const handleDownload = async () => {
    if (!currentImage) return;
    
    try {
      const response = await fetch(currentImage.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentImage.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Скачано!",
        description: "Изображение сохранено на устройство.",
      });
    } catch (error) {
      toast({
        title: "Ошибка скачивания",
        description: "Не удалось скачать изображение.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Generation Card */}
      <Card className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 transition-all-smooth hover:shadow-xl">
        <div className="text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-cat-coral to-ios-orange rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center text-3xl md:text-4xl animate-gradient bounce-in">
            🎨
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 slide-in-left animate-delay-100">Генератор Котиков</h2>
          <p className="text-gray-600 mb-6 leading-relaxed slide-in-right animate-delay-200 text-sm md:text-base">
            Создавайте уникальные изображения котиков одним касанием. Каждая генерация полностью уникальна!
          </p>
          
          {/* Generate Button */}
          <Button
            onClick={() => generateMutation.mutate()}
            disabled={generateMutation.isPending}
            data-testid="button-generate-cat"
            className={`w-full bg-ios-blue hover:bg-ios-blue/90 text-white font-semibold py-4 md:py-5 px-6 md:px-8 rounded-2xl ios-button-scale shadow-lg transition-spring glow-effect relative overflow-hidden ripple-effect ${
              !currentImage && !generateMutation.isPending ? 'pulse-animation' : ''
            }`}
          >
            {/* Background gradient animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-ios-blue via-blue-500 to-ios-blue animate-gradient opacity-75"></div>
            
            <div className="relative z-10 flex items-center justify-center">
              {generateMutation.isPending ? (
                <>
                  <span className="transition-spring">Создание котика...</span>
                  <RefreshCw className="w-5 h-5 ml-3 animate-spin" />
                </>
              ) : (
                <span className="transition-spring font-bold">
                  {currentImage ? "🎨 Создать Еще Котика" : "✨ Создать Котика"}
                </span>
              )}
            </div>
          </Button>
        </div>
      </Card>

      {/* Generated Image Display */}
      {currentImage && (
        <Card className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden fade-in-up hover:shadow-xl transition-spring hover-lift">
          <div className="relative group">
            <img
              src={currentImage.imageUrl}
              alt={currentImage.title}
              data-testid="img-generated-cat"
              className="w-full h-80 md:h-96 lg:h-[500px] object-cover transition-spring group-hover:scale-110 fade-in-blur"
              loading="lazy"
            />
            
            {/* Action Buttons Overlay */}
            <div className="absolute top-4 right-4 flex space-x-2 slide-in-right stagger-children">
              <Button
                size="sm"
                variant="secondary"
                data-testid="button-share"
                className="w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-0 shadow-lg ios-button-scale glow-effect transition-spring ripple-effect"
                onClick={handleShare}
              >
                <Share className="w-5 h-5 text-gray-700 transition-spring group-hover:rotate-12" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                data-testid="button-download"
                className="w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-0 shadow-lg ios-button-scale glow-effect transition-spring ripple-effect"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5 text-gray-700 transition-spring group-hover:translate-y-1" />
              </Button>
            </div>
            
            {/* Heart/Like Button */}
            <Button
              size="sm"
              variant="secondary"
              data-testid="button-like"
              className={`absolute bottom-4 right-4 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-0 shadow-lg ios-button-scale glow-effect transition-spring scale-in ripple-effect ${
                likeAnimation ? 'elastic-bounce' : ''
              }`}
              onClick={() => likeMutation.mutate(currentImage.id)}
              disabled={likeMutation.isPending}
            >
              <Heart
                className={`w-6 h-6 transition-spring ${
                  currentImage.liked 
                    ? 'text-red-500 fill-red-500 scale-125' 
                    : 'text-red-500 hover:scale-125'
                } ${likeMutation.isPending ? 'animate-spin-slow' : ''}`}
              />
            </Button>
          </div>
          
          {/* Image Info */}
          <div className="p-4 slide-in-left animate-delay-400">
            <div className="flex items-center justify-between">
              <div className="slide-in-left animate-delay-500">
                <p className="font-semibold text-gray-900 transition-spring" data-testid="text-cat-title">{currentImage.title}</p>
                <p className="text-sm text-gray-500 transition-spring">Только что создан ✨</p>
              </div>
              <div className="flex items-center space-x-4 slide-in-right animate-delay-500">
                <div className="flex items-center space-x-1 text-gray-500 transition-spring hover:text-red-500 hover:scale-110">
                  <Heart className={`w-4 h-4 transition-spring ${currentImage.liked ? 'text-red-500 fill-red-500' : ''}`} />
                  <span className="text-sm transition-spring" data-testid="text-like-count">
                    {currentImage.liked ? "1" : "0"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  data-testid="button-generate-again"
                  className="text-ios-blue font-medium ios-button-scale glow-effect transition-spring hover:bg-ios-blue/10 ripple-effect"
                  onClick={() => generateMutation.mutate()}
                  disabled={generateMutation.isPending}
                >
                  <span className="transition-spring">Еще раз</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}