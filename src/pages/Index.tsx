import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const mockWeatherData = {
  current: {
    temp: 24,
    condition: 'Солнечно',
    icon: 'Sun',
    feels_like: 22,
    humidity: 65,
    wind_speed: 12,
    uv_index: 6,
  },
  hourly: Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    temp: 20 + Math.floor(Math.random() * 10),
    icon: i > 6 && i < 20 ? 'Sun' : 'Moon',
    precipitation: Math.floor(Math.random() * 30),
  })),
  daily: [
    { day: 'Пн', icon: 'Sun', temp_max: 26, temp_min: 18 },
    { day: 'Вт', icon: 'CloudRain', temp_max: 22, temp_min: 16 },
    { day: 'Ср', icon: 'Cloud', temp_max: 20, temp_min: 14 },
    { day: 'Чт', icon: 'Sun', temp_max: 25, temp_min: 17 },
    { day: 'Пт', icon: 'CloudDrizzle', temp_max: 21, temp_min: 15 },
    { day: 'Сб', icon: 'Sun', temp_max: 27, temp_min: 19 },
    { day: 'Вс', icon: 'CloudSun', temp_max: 24, temp_min: 18 },
  ],
  locations: ['Москва', 'Санкт-Петербург', 'Казань'],
};

export default function Index() {
  const [activeTab, setActiveTab] = useState('current');
  const [location, setLocation] = useState('Москва');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const getGradientClass = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'from-orange-400 via-pink-400 to-purple-500';
    if (hour >= 12 && hour < 17) return 'from-blue-400 via-cyan-400 to-teal-400';
    if (hour >= 17 && hour < 21) return 'from-orange-500 via-red-400 to-purple-600';
    return 'from-indigo-900 via-purple-900 to-pink-900';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="animate-pulse text-white text-2xl font-light">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className="relative z-10 max-w-md mx-auto px-4 py-6 pb-28">
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" className="text-white" size={20} />
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/20 backdrop-blur-md text-white text-lg font-medium px-3 py-1 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              {mockWeatherData.locations.map((loc) => (
                <option key={loc} value={loc} className="text-gray-800">{loc}</option>
              ))}
            </select>
          </div>
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all">
            <Icon name="Settings" className="text-white" size={20} />
          </button>
        </div>

        <div className={`bg-gradient-to-br ${getGradientClass()} rounded-3xl p-8 mb-6 shadow-2xl animate-slide-up relative overflow-hidden`}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <Icon name={mockWeatherData.current.icon} className="text-white" size={120} strokeWidth={1} />
            </div>
            
            <div className="text-center mb-2">
              <div className="text-8xl font-light text-white mb-2">{mockWeatherData.current.temp}°</div>
              <div className="text-2xl text-white/90 font-light">{mockWeatherData.current.condition}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
              <div className="text-center">
                <Icon name="Droplets" className="text-white/80 mx-auto mb-1" size={20} />
                <div className="text-white/80 text-sm">Влажность</div>
                <div className="text-white font-semibold">{mockWeatherData.current.humidity}%</div>
              </div>
              <div className="text-center">
                <Icon name="Wind" className="text-white/80 mx-auto mb-1" size={20} />
                <div className="text-white/80 text-sm">Ветер</div>
                <div className="text-white font-semibold">{mockWeatherData.current.wind_speed} км/ч</div>
              </div>
              <div className="text-center">
                <Icon name="Sun" className="text-white/80 mx-auto mb-1" size={20} />
                <div className="text-white/80 text-sm">УФ индекс</div>
                <div className="text-white font-semibold">{mockWeatherData.current.uv_index}</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white/20 backdrop-blur-md border-0 p-1 mb-4">
            <TabsTrigger 
              value="current" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-purple-600 text-white rounded-lg transition-all"
            >
              Сейчас
            </TabsTrigger>
            <TabsTrigger 
              value="hourly" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-purple-600 text-white rounded-lg transition-all"
            >
              24 часа
            </TabsTrigger>
            <TabsTrigger 
              value="weekly" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-purple-600 text-white rounded-lg transition-all"
            >
              Неделя
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-0 animate-fade-in">
            <Card className="bg-white/20 backdrop-blur-md border-0 p-6 rounded-2xl">
              <h3 className="text-white font-semibold text-lg mb-4">Подробности</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Icon name="Thermometer" className="text-white" size={20} />
                    </div>
                    <span className="text-white/90">Ощущается как</span>
                  </div>
                  <span className="text-white font-semibold text-lg">{mockWeatherData.current.feels_like}°</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Icon name="Eye" className="text-white" size={20} />
                    </div>
                    <span className="text-white/90">Видимость</span>
                  </div>
                  <span className="text-white font-semibold text-lg">10 км</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Icon name="Gauge" className="text-white" size={20} />
                    </div>
                    <span className="text-white/90">Давление</span>
                  </div>
                  <span className="text-white font-semibold text-lg">1013 мб</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="hourly" className="mt-0 animate-fade-in">
            <Card className="bg-white/20 backdrop-blur-md border-0 p-4 rounded-2xl">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {mockWeatherData.hourly.map((hour, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <span className="text-white font-medium w-16">{hour.time}</span>
                      <div className="flex items-center gap-4 flex-1 justify-center">
                        <Icon name={hour.icon} className="text-white" size={24} />
                        <div className="w-20 bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-white rounded-full h-2 transition-all" 
                            style={{ width: `${hour.precipitation}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-white font-semibold text-lg w-12 text-right">{hour.temp}°</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="mt-0 animate-fade-in">
            <Card className="bg-white/20 backdrop-blur-md border-0 p-4 rounded-2xl">
              <div className="space-y-3">
                {mockWeatherData.daily.map((day, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <span className="text-white font-medium w-12">{day.day}</span>
                    <Icon name={day.icon} className="text-white" size={28} />
                    <div className="flex items-center gap-3">
                      <span className="text-white/70 text-sm">{day.temp_min}°</span>
                      <div className="w-24 bg-white/20 rounded-full h-2 relative">
                        <div 
                          className="bg-gradient-to-r from-blue-300 to-orange-300 rounded-full h-2 absolute" 
                          style={{ 
                            left: '0%', 
                            width: `${((day.temp_max - day.temp_min) / 20) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-white font-semibold">{day.temp_max}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/20 z-20">
        <div className="max-w-md mx-auto px-8 py-4">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-white hover:text-white/80 transition-all">
              <Icon name="Cloud" size={24} />
              <span className="text-xs">Погода</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-all">
              <Icon name="Map" size={24} />
              <span className="text-xs">Карта</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-all">
              <Icon name="MapPin" size={24} />
              <span className="text-xs">Города</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-all">
              <Icon name="Settings" size={24} />
              <span className="text-xs">Настройки</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}