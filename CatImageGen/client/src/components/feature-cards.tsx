import { Card } from "@/components/ui/card";

export default function FeatureCards() {
  const features = [
    {
      icon: "⚡️",
      title: "Мгновенно Быстро",
      description: "Генерация изображений за секунды с помощью ИИ",
      gradient: "from-ios-blue via-blue-500 to-blue-600",
      shadowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: "🎯",
      title: "Всегда Уникальные",
      description: "Каждый котик создается особенным и неповторимым",
      gradient: "from-cat-coral via-pink-400 to-pink-500",
      shadowColor: "rgba(255, 107, 107, 0.3)",
    },
    {
      icon: "📱",
      title: "Для iPhone",
      description: "Идеально оптимизировано для мобильных устройств",
      gradient: "from-ios-orange via-orange-400 to-yellow-500",
      shadowColor: "rgba(249, 115, 22, 0.3)",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 slide-in-left transition-spring">✨ Возможности Приложения</h3>
      
      <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0 stagger-children">
        {features.map((feature, index) => (
          <Card
            key={index}
            data-testid={`card-feature-${index}`}
            className={`bg-gradient-to-r ${feature.gradient} rounded-2xl p-5 text-white border-0 ios-button-scale cursor-pointer animate-gradient hover:shadow-2xl transition-spring group overflow-hidden relative hover-lift ripple-effect`}
            style={{
              boxShadow: `0 8px 25px ${feature.shadowColor}`,
            }}
          >
            {/* Background decoration with enhanced animations */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-[2] transition-spring"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-white bg-opacity-10 rounded-full translate-y-6 -translate-x-6 group-hover:scale-150 transition-spring"></div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-spring transform -translate-x-full group-hover:translate-x-full duration-1000"></div>
            
            <div className="flex items-center space-x-4 relative z-10">
              <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl transition-spring group-hover:rotate-12 group-hover:scale-125 elastic-bounce">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-1 transition-spring group-hover:translate-x-2">
                  {feature.title}
                </h4>
                <p className="text-sm opacity-90 leading-relaxed transition-spring group-hover:opacity-100 group-hover:translate-x-1">
                  {feature.description}
                </p>
              </div>
              <div className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-spring group-hover:translate-x-2 group-hover:scale-125">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Additional info card with enhanced animations */}
      <Card className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-4 border-0 ios-button-scale transition-spring hover:shadow-lg fade-in-up animate-delay-400 md:col-span-2 lg:col-span-3 md:mt-4 hover-lift group ripple-effect cursor-pointer" data-testid="card-info">
        <div className="text-center">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center text-lg transition-spring group-hover:scale-110 group-hover:rotate-12 elastic-bounce">
            💡
          </div>
          <p className="text-sm text-gray-700 font-medium transition-spring group-hover:text-gray-900">
            Все котики создаются с использованием API реальных фотографий кошек
          </p>
        </div>
      </Card>
    </div>
  );
}