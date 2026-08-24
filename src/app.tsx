import React, { useState } from 'react';
import { Home, Inbox, Compass, Bot, Heart, MessageCircle, PlusSquare, User, Camera, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'inbox' | 'explore' | 'copilot' | 'profile'>('home');
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({ 1: 124, 2: 89 });

  const toggleLike = (id: number) => {
    const isLiked = likes[id];
    setLikes({ ...likes, [id]: !isLiked });
    setLikeCounts({
      ...likeCounts,
      [id]: isLiked ? likeCounts[id] - 1 : likeCounts[id] + 1
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 flex flex-col max-w-md mx-auto relative">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Trendora
        </h1>
        <div className="flex items-center space-x-4">
          <PlusSquare className="w-6 h-6 cursor-pointer hover:text-pink-400 transition" />
          <Heart className="w-6 h-6 cursor-pointer hover:text-pink-400 transition" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Stories Row */}
            <div className="flex space-x-3 overflow-x-auto px-4 py-3 border-b border-zinc-800 scrollbar-none">
              {[
                { name: 'შენი ამბავი', isUser: true },
                { name: 'სტილი', isUser: false },
                { name: 'טרენდი', isUser: false },
                { name: 'ლუქი', isUser: false },
                { name: 'შოპინგი', isUser: false }
              ].map((story, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer">
                  <div className={`w-16 h-16 rounded-full p-[2px] ${story.isUser ? 'border-2 border-zinc-600' : 'bg-gradient-to-tr from-yellow-400 to-pink-600'}`}>
                    <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center text-xs">
                      {story.isUser ? <User className="w-6 h-6 text-zinc-400" /> : `PIC`}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400">{story.name}</span>
                </div>
              ))}
            </div>

            {/* Post 1 */}
            <div className="border-b border-zinc-800 pb-4">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm">T</div>
                  <span className="text-sm font-medium">Trendora Style</span>
                </div>
                <span className="text-zinc-500 text-sm">...</span>
              </div>
              <div className="w-full h-96 bg-zinc-900 flex flex-col items-center justify-center text-zinc-600">
                <Camera className="w-12 h-12 mb-2 opacity-50" />
                <span className="text-sm">სტილის ფოტო</span>
              </div>
              <div className="px-4 py-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <Heart 
                      onClick={() => toggleLike(1)} 
                      className={`w-6 h-6 cursor-pointer transition ${likes[1] ? 'text-red-500 fill-red-500' : 'hover:text-zinc-400'}`} 
                    />
                    <MessageCircle className="w-6 h-6 cursor-pointer hover:text-zinc-400" />
                  </div>
                </div>
                <div className="text-sm font-semibold">{likeCounts[1]} მოწონება</div>
                <div className="text-sm">
                  <span className="font-semibold mr-2">Trendora Style</span>
                  ახალი სეზონის ტრენდები და საუკეთესო ლუქები თქვენი გარდერობისთვის! ✨
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inbox' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold">შეტობინებები</h2>
            <div className="text-sm text-zinc-400">მალე აქ იქნება მესიჯები...</div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold">აღმოჩენა & Reels</h2>
            <div className="text-sm text-zinc-400">მალე აქ იქნება რეილსები...</div>
          </div>
        )}

        {activeTab === 'copilot' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold">AI სტილისტი</h2>
            <div className="text-sm text-zinc-400">მალე აქ იქნება AI ჩათი...</div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold">ჩემი პროფილი</h2>
            <div className="text-sm text-zinc-400">მალე აქ იქნება პროფილის და სეთინგების მართვა...</div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black/95 backdrop-blur border-t border-zinc-800 py-3 px-6 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-white' : 'text-zinc-500'}`}>
          <Home className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('inbox')} className={`flex flex-col items-center ${activeTab === 'inbox' ? 'text-white' : 'text-zinc-500'}`}>
          <Inbox className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('explore')} className={`flex flex-col items-center ${activeTab === 'explore' ? 'text-white' : 'text-zinc-500'}`}>
          <Compass className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('copilot')} className={`flex flex-col items-center ${activeTab === 'copilot' ? 'text-purple-400' : 'text-zinc-500'}`}>
          <Bot className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-white' : 'text-zinc-500'}`}>
          <User className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}
