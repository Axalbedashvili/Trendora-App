import React, { useState } from 'react';
import { Home, Inbox, Compass, Bot, Heart, MessageCircle, PlusSquare, User, Sparkles, Camera } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'inbox' | 'explore' | 'copilot'>('home');
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

            {/* Post 2 */}
            <div className="border-b border-zinc-800 pb-4">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center font-bold text-sm">G</div>
                  <span className="text-sm font-medium">Georgian Chic</span>
                </div>
                <span className="text-zinc-500 text-sm">...</span>
              </div>
              <div className="w-full h-96 bg-zinc-900 flex flex-col items-center justify-center text-zinc-600">
                <Sparkles className="w-12 h-12 mb-2 opacity-50" />
                <span className="text-sm">ლუქის ინსპირაცია</span>
              </div>
              <div className="px-4 py-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <Heart 
                      onClick={() => toggleLike(2)} 
                      className={`w-6 h-6 cursor-pointer transition ${likes[2] ? 'text-red-500 fill-red-500' : 'hover:text-zinc-400'}`} 
                    />
                    <MessageCircle className="w-6 h-6 cursor-pointer hover:text-zinc-400" />
                  </div>
                </div>
                <div className="text-sm font-semibold">{likeCounts[2]} მოწონება</div>
                <div className="text-sm">
                  <span className="font-semibold mr-2">Georgian Chic</span>
                  შეარჩიე შენი ინდივიდუალური სტილი ჩვენთან ერთად. 🖤
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inbox' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold">შეტობინებები</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-zinc-900 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">AI</div>
                <div>
                  <div className="font-medium text-sm">Trendora AI სტილისტი</div>
                  <div className="text-xs text-zinc-400">მოგესალმები! მზად ვარ შენი ახალი ლუქი შევარჩიოთ.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold">აღმოჩენა</h2>
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-900 flex items-center justify-center text-zinc-700 text-xs border border-zinc-950">
                  Post {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'copilot' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" /> AI სტილისტი
            </h2>
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 space-y-3">
              <p className="text-sm text-zinc-300">გამარჯობა! მკითხე ნებისმიერი რამ სტილის, ფერების შეხამებისა ან ტრენდების შესახებ.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="სად იცვამ დღეს?" 
                  className="flex-1 bg-black border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <button className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-500 transition">
                  გაგზავნა
                </button>
              </div>
            </div>
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
      </nav>
    </div>
  );
}
