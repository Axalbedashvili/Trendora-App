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
    <div className="min-h-screen bg-black text-white pb-20 flex flex-col max-w-md mx-auto relative select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-purple-900/30 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-purple-400 via-pink-500 to-emerald-400 bg-clip-text text-transparent">
          Trendora
        </h1>
        <div className="flex items-center space-x-4">
          <PlusSquare className="w-6 h-6 cursor-pointer text-purple-400 hover:text-pink-400 transition" />
          <Heart className="w-6 h-6 cursor-pointer text-pink-500 hover:text-purple-400 transition" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Stories Row */}
            <div className="flex space-x-3 overflow-x-auto px-4 py-3 border-b border-purple-900/20 scrollbar-none">
              {[
                { name: 'შენი ამბავი', isUser: true },
                { name: 'სტილი', isUser: false },
                { name: 'טרენდი', isUser: false },
                { name: 'ლუქი', isUser: false },
                { name: 'შოპინგი', isUser: false }
              ].map((story, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer">
                  <div className={`w-16 h-16 rounded-full p-[2px] ${story.isUser ? 'border-2 border-emerald-400' : 'bg-gradient-to-tr from-purple-500 via-pink-500 to-emerald-400'}`}>
                    <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center text-xs">
                      {story.isUser ? <User className="w-6 h-6 text-emerald-400" /> : <span className="text-xs text-pink-300 font-semibold">PIC</span>}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400">{story.name}</span>
                </div>
              ))}
            </div>

            {/* Post 1 */}
            <div className="border-b border-zinc-800 pb-4 bg-zinc-950/40">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-purple-900/50">T</div>
                  <span className="text-sm font-medium text-zinc-200">Trendora Style</span>
                </div>
                <span className="text-zinc-500 text-sm">...</span>
              </div>
              <div className="w-full h-96 bg-zinc-900 flex flex-col items-center justify-center text-zinc-500 relative">
                <div className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs px-2.5 py-1 rounded-full font-medium">
                  Score: 96 ✨
                </div>
                <Camera className="w-12 h-12 mb-2 text-purple-400 opacity-60" />
                <span className="text-sm">სტილის ფოტო</span>
              </div>
              <div className="px-4 py-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <Heart 
                      onClick={() => toggleLike(1)} 
                      className={`w-6 h-6 cursor-pointer transition ${likes[1] ? 'text-pink-500 fill-pink-500' : 'text-zinc-300 hover:text-pink-400'}`} 
                    />
                    <MessageCircle className="w-6 h-6 cursor-pointer text-zinc-300 hover:text-purple-400" />
                  </div>
                </div>
                <div className="text-sm font-semibold text-purple-300">{likeCounts[1]} მოწონება</div>
                <div className="text-sm text-zinc-300">
                  <span className="font-semibold mr-2 text-white">Trendora Style</span>
                  ახალი სეზონის ტრენდები და საუკეთესო ლუქები თქვენი გარდერობისთვის! ✨
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inbox' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">შეტობინებები</h2>
            <div className="text-sm text-zinc-400 bg-zinc-900/50 p-4 rounded-2xl border border-purple-900/20">მალე აქ იქნება მესიჯები...</div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">აღმოჩენა & Reels</h2>
            <div className="text-sm text-zinc-400 bg-zinc-900/50 p-4 rounded-2xl border border-purple-900/20">მალე აქ იქნება რეილსები...</div>
          </div>
        )}

        {activeTab === 'copilot' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-400" /> AI სტილისტი
            </h2>
            <div className="text-sm text-zinc-300 bg-zinc-900/50 p-4 rounded-2xl border border-emerald-500/20">მალე აქ იქნება AI ჩათი...</div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 via-pink-500 to-emerald-400">
                <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-pink-400" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-lg text-white">გიორგი</h2>
                <p className="text-xs text-emerald-400 font-medium">სტილის ქულა: 98 / 100 ✨</p>
              </div>
            </div>
            <div className="text-sm text-zinc-300 bg-zinc-900/50 p-4 rounded-2xl border border-purple-500/20">
              მალე აქ იქნება პროფილის და სეთინგების მართვა ფერად სტილში...
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black/95 backdrop-blur border-t border-purple-900/30 py-3 px-6 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center transition ${activeTab === 'home' ? 'text-pink-500' : 'text-zinc-500 hover:text-zinc-300'}`}>
          <Home className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('inbox')} className={`flex flex-col items-center transition ${activeTab === 'inbox' ? 'text-pink-500' : 'text-zinc-500 hover:text-zinc-300'}`}>
          <Inbox className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('explore')} className={`flex flex-col items-center transition ${activeTab === 'explore' ? 'text-pink-500' : 'text-zinc-500 hover:text-zinc-300'}`}>
          <Compass className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('copilot')} className={`flex flex-col items-center transition ${activeTab === 'copilot' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
          <Bot className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center transition ${activeTab === 'profile' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
          <User className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}
