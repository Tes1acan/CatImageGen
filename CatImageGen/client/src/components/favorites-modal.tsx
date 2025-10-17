import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Star, Crown, X } from "lucide-react";
import type { CatImage } from "@shared/schema";

interface FavoritesModalProps {
  trigger: React.ReactNode;
}

export default function FavoritesModal({ trigger }: FavoritesModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<CatImage | null>(null);
  const [showStory, setShowStory] = useState(false);

  const { data: images, isLoading } = useQuery<CatImage[]>({
    queryKey: ["/api/cat-images"],
  });

  const favoriteImages = images?.filter(img => img.liked) || [];

  // Генерируем уникальные истории для каждого котика
  const generateCatStory = (cat: CatImage, index: number) => {
    const stories = [
      {
        personality: "Любопытный исследователь",
        story: "Этот котик обожает изучать каждый уголок дома. Его любимое место — подоконник, откуда он наблюдает за птичками и планирует свои приключения.",
        hobby: "Охота на солнечные зайчики",
        icon: <Sparkles className="w-4 h-4 text-yellow-500" />
      },
      {
        personality: "Королевская особа", 
        story: "Этот аристократичный котик знает себе цену. Он предпочитает самые удобные подушки и требует внимания по королевскому протоколу.",
        hobby: "Позирование для фотографий",
        icon: <Crown className="w-4 h-4 text-purple-500" />
      },
      {
        personality: "Игривый проказник",
        story: "Энергичный котик, который превращает любой день в праздник! Его игрушки разбросаны по всему дому, и он готов играть 24/7.",
        hobby: "Прятки за занавесками", 
        icon: <Star className="w-4 h-4 text-green-500" />
      },
      {
        personality: "Нежный мурлыка",
        story: "Самый ласковый котик в мире! Он обожает обниматься и мурлыкать колыбельные. Его мурчание успокаивает даже в самый трудный день.",
        hobby: "Сон на коленях у хозяина",
        icon: <Heart className="w-4 h-4 text-pink-500" />
      },
      {
        personality: "Мудрый философ",
        story: "Этот котик любит размышлять о глубоких вопросах жизни. Часто его можно найти сидящим в задумчивой позе, созерцающим мир.",
        hobby: "Медитация у камина",
        icon: <Sparkles className="w-4 h-4 text-blue-500" />
      }
    ];
    return stories[index % stories.length];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-sm mx-auto max-h-[80vh] overflow-hidden md:max-w-2xl lg:max-w-4xl scale-in animate-backdrop">
        <DialogHeader className="fade-in-up">
          <DialogTitle className="flex items-center space-x-2 text-center justify-center">
            <Heart className="w-5 h-5 text-red-500 fill-red-500 elastic-bounce animate-delay-100" />
            <span>Любимые Котики</span>
            <Heart className="w-5 h-5 text-red-500 fill-red-500 elastic-bounce animate-delay-200" />
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Ваша коллекция особенных котиков с уникальными историями
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[60vh] px-2">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                  <div className="w-full h-32 bg-gray-200"></div>
                  <div className="p-3">
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : favoriteImages.length === 0 ? (
            <div className="text-center py-8 fade-in-up">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                💔
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Нет любимых котиков</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Начните ставить лайки котикам, чтобы добавить их в избранное!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 stagger-children">
              {favoriteImages.map((image, index) => {
                const story = generateCatStory(image, index);
                return (
                  <Card
                    key={image.id}
                    data-testid={`card-favorite-cat-${image.id}`}
                    className={`bg-white rounded-2xl shadow-md overflow-hidden ios-button-scale cursor-pointer hover:shadow-2xl transition-spring group hover-lift ripple-effect`}
                    onClick={() => {
                      setSelectedCat(image);
                      setOpen(false);
                      setShowStory(true);
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={image.thumbnailUrl || image.imageUrl}
                        alt={image.title}
                        className="w-full h-32 object-cover transition-spring group-hover:scale-125 group-hover:rotate-3"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 elastic-bounce animate-delay-100">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500 drop-shadow-lg" />
                      </div>
                      <div className="absolute top-2 left-2 bounce-in animate-delay-200">
                        {story.icon}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-spring"></div>
                      <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-spring group-hover:translate-y-0 translate-y-2">
                        <p className="text-xs font-medium drop-shadow-lg">Нажмите для истории ✨</p>
                      </div>
                    </div>
                    <div className="p-3 transition-spring group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-pink-50">
                      <p className="text-sm font-medium text-gray-900 truncate transition-spring group-hover:text-red-600 group-hover:translate-x-1">
                        {image.title}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500 transition-spring truncate group-hover:text-gray-700">
                          {story.personality}
                        </p>
                        <Heart className="w-3 h-3 text-red-500 fill-red-500 transition-spring group-hover:scale-125" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
        
        {favoriteImages.length > 0 && (
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {favoriteImages.length} любимых котиков в коллекции
            </p>
          </div>
        )}
      </DialogContent>

      {/* Cat Story Detail Modal - Separate modal */}
      {selectedCat && (
        <Dialog open={showStory} onOpenChange={(open) => {
          setShowStory(open);
          if (!open) setSelectedCat(null);
        }}>
          <DialogContent className="max-w-sm mx-auto md:max-w-2xl lg:max-w-3xl scale-in animate-backdrop">
            {/* Дополнительная кнопка закрытия для надежности */}
            <button
              onClick={() => {
                setShowStory(false);
                setSelectedCat(null);
              }}
              data-testid="button-close-story"
              className="absolute right-2 top-2 z-50 p-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-md ios-button-scale transition-spring bounce-in animate-delay-100 ripple-effect"
            >
              <X className="h-5 w-5 text-gray-600 transition-spring hover:rotate-90" />
            </button>
            <DialogHeader className="fade-in-up">
              <DialogTitle className="flex items-center space-x-2 pr-10">
                <span className="bounce-in animate-delay-100">
                  {generateCatStory(selectedCat, favoriteImages.findIndex(img => img.id === selectedCat.id)).icon}
                </span>
                <span className="slide-in-left animate-delay-150">{selectedCat.title}</span>
              </DialogTitle>
              <DialogDescription className="slide-in-right animate-delay-200">
                История вашего любимого котика
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 stagger-children">
              {/* Cat Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={selectedCat.imageUrl}
                  alt={selectedCat.title}
                  className="w-full h-48 object-cover fade-in-blur"
                />
                <div className="absolute top-3 right-3 elastic-bounce animate-delay-300">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500 drop-shadow-lg" />
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 hover-lift transition-spring">
                  <div className="flex items-center space-x-2 mb-2">
                    {generateCatStory(selectedCat, favoriteImages.findIndex(img => img.id === selectedCat.id)).icon}
                    <h4 className="font-semibold text-gray-900">
                      {generateCatStory(selectedCat, favoriteImages.findIndex(img => img.id === selectedCat.id)).personality}
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {generateCatStory(selectedCat, favoriteImages.findIndex(img => img.id === selectedCat.id)).story}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 hover-lift transition-spring">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span>Любимое занятие</span>
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {generateCatStory(selectedCat, favoriteImages.findIndex(img => img.id === selectedCat.id)).hobby}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 hover-lift transition-spring">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Почему он особенный</span>
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Этот котик завоевал ваше сердце своей уникальной индивидуальностью. Каждый раз, глядя на него, вы улыбаетесь и чувствуете тепло в душе. ❤️
                  </p>
                </div>
              </div>

              <Button
                onClick={() => {
                  setShowStory(false);
                  setSelectedCat(null);
                }}
                data-testid="button-close-story-bottom"
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl ios-button-scale transition-spring ripple-effect glow-effect"
              >
                Закрыть историю
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}