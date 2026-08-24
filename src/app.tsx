import React, { useState } from 'react';
import { Home, Inbox, Compass, Bot, Heart, MessageCircle, PlusSquare, User, Sparkles, Camera, Settings, Lock, Image as ImageIcon, ChevronRight, LogOut } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'inbox' | 'explore' | 'copilot' | 'profile'>('home');
  const [currentView, setCurrentView] = useState<'main' | 'settings'>('main');
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({ 1: 124, 2: 89 });

  // Profile editable states
  const [bio, setBio] = useState('მოდის და სტილის ენთუზიასტი ✨ | Tbilisi');
  const [isEditingBio, setIsEditingBio] = useState(false);

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
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-zinc-900 rounded-2xl border border-zinc-800">
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
            <h2 className="text-lg font-bold">აღმოჩენა & Reels</h2>
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-900 flex items-center justify-center text-zinc-600 text-xs border border-zinc-950">
                  Reel / Post {i + 1}
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

        {activeTab === 'profile' && (
          <div>
            {currentView === 'main' ? (
              <div className="p-4 space-y-6">
                {/* Profile Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
                      <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden">
                        <User className="w-10 h-10 text-zinc-400" />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">გიორგი</h2>
                      <p className="text-xs text-zinc-400">სტილის ქულა: <span className="text-pink-400 font-bold">98 / 100</span></p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCurrentView('settings')}
                    className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition"
                  >
                    <Settings className="w-5 h-5 text-zinc-300" />
                  </button>
                </div>

                {/* Bio Section */}
                <div className="text-sm space-y-1">
                  <p className="text-zinc-300">{bio}</p>
                </div>

                {/* Profile Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentView('settings')}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 py-2 rounded-xl text-sm font-medium transition"
                  >
                    პროფილის რედაქტირება
                  </button>
                </div>

                {/* Grid Posts */}
                <div className="border-t border-zinc-800 pt-4">
                  <div className="grid grid-cols-3 gap-1">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="aspect-square bg-zinc-900 flex items-center justify-center text-zinc-600 text-xs border border-zinc-950">
                        ლუქი {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Settings & Edit View */
              <div className="p-4 space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h2 className="font-bold text-lg">პარამეტრები & პროფილი</h2>
                  <button 
                    onClick={() => setCurrentView('main')}
                    className="text-sm text-purple-400 font-medium"
                  >
                    უკან
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Change Profile Photo */}
                  <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex items-center justify-between cursor-pointer hover:border-zinc-700 transition">
                    <div className="flex items-center space-x-3">
                      <ImageIcon className="w-5 h-5 text-purple-400" />
                      <span className="text-sm font-medium">პროფილის ფოტოს შეცვლა</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </div>

                  {/* Edit Bio */}
                  <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 space-y-2">
                    <span className="text-sm font-medium text-zinc-300">ბიოგრაფია / აღწერა</span>
                    <input 
                      type="text" 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Change Password */}
                  <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-pink-400" />
                      <span className="text-sm font-medium">პაროლის შეცვლა</span>
                    </div>
                    <input 
                      type="password" 
                      placeholder="ძველი პაროლი" 
                      className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                    <input 
                      type="password" 
                      placeholder="ახალი პაროლი" 
                      className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                    <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl text-sm font-medium transition">
                      პაროლის განახლება
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black/95 backdrop-blur border-t border-zinc-800 py-3 px-6 flex justify-between items-center z-50">
        <button onClick={() => { setActiveTab('home'); setCurrentView('main'); }} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-white' : 'text-zinc-500'}`}>
          <Home className="w-6 h-6" />
        </button>
        <button onClick={() => { setActiveTab('inbox'); setCurrentView('main'); }} className={`flex flex-col items-center ${activeTab === 'inbox' ? 'text-white' : 'text-zinc-500'}`}>
          <Inbox className="w-6 h-6" />
        </button>
        <button onClick={() => { setActiveTab('explore'); setCurrentView('main'); }} className={`flex flex-col items-center ${activeTab === 'explore' ? 'text-white' : 'text-zinc-500'}`}>
          <Compass className="w-6 h-6" />
        </button>
        <button onClick={() => { setActiveTab('copilot'); setCurrentView('main'); }} className={`flex flex-col items-center ${activeTab === 'copilot' ? 'text-purple-400' : 'text-zinc-500'}`}>
          <Bot className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-white' : 'text-zinc-500'}`}>
          <User className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}
