import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { 
  Home, 
  Shirt, 
  Sparkles, 
  PlusSquare, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Settings, 
  Lock, 
  Share2, 
  LogOut, 
  Grid, 
  Sliders, 
  Bell,
  CheckCircle2,
  ChevronRight,
  Camera,
  X
} from 'lucide-react';

interface Story {
  id: string;
  user_name: string;
  image_url: string;
  created_at?: string;
}

export default function Component() {
  const [activeTab, setActiveTab] = useState<'feed' | 'wardrobe' | 'ai' | 'profile'>('feed');
  const [showSettings, setShowSettings] = useState(false);
  const [eventCategory, setEventCategory] = useState<string>('party');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);

  // Modals / Zoom States
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Supabase Data
  const [stories, setStories] = useState<Story[]>([]);
  const [newStoryUrl, setNewStoryUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [reactions, setReactions] = useState({
    veryGood: 142,
    good: 58,
    wonderful: 96,
    normal: 19
  });
  const [userReaction, setUserReaction] = useState<string | null>(null);

  // Fetch Stories from Supabase
  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setStories(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Add Story to Supabase
  const handleAddStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryUrl) return;

    setIsUploading(true);
    const { error } = await supabase.from('stories').insert([
      {
        user_name: 'გიორგი',
        image_url: newStoryUrl
      }
    ]);

    setIsUploading(false);
    if (!error) {
      setNewStoryUrl('');
      fetchStories();
    } else {
      alert('სთორის დამატება ვერ მოხერხდა: ' + error.message);
    }
  };

  const handleReaction = (type: keyof typeof reactions) => {
    if (userReaction === type) {
      setReactions(prev => ({ ...prev, [type]: prev[type] - 1 }));
      setUserReaction(null);
    } else {
      if (userReaction) {
        setReactions(prev => ({ ...prev, [userReaction as keyof typeof reactions]: prev[userReaction as keyof typeof reactions] - 1 }));
      }
      setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
      setUserReaction(type);
    }
  };

  const generateAiOutfit = (event: string) => {
    setEventCategory(event);
    if (event === 'party') {
      setAiRecommendation('🎉 დაბადების დღისთვის: შავი სილქის პერანგი + ღია ნაცრისფერი შარვალი + ტყავის ლოფერები შენი გარდერობიდან. 💡 ბიუჯეტური რჩევა: Zara-ს ვერცხლისფერი საათი (89 ₾).');
    } else if (event === 'condolence') {
      setAiRecommendation('🖤 სამძიმრისთვის: კლასიკური შავი პიჯაკი + მუქი შავი შარვალი + შავი მაისური. სოლიდური, შეკრული და ელეგანტური სტილი.');
    } else if (event === 'casual') {
      setAiRecommendation('☕ მეგობრებთან: Oversize ბეჟი ჰუდი + ღია ჯინსი + თეთრი სნიკერსები. 💡 ბიუჯეტური რჩევა: Mango-ს კრემისფერი ქუდი (45 ₾).');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 max-w-md mx-auto shadow-2xl border-x border-slate-200 relative">
      
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200/80 shadow-sm">
        <button onClick={() => setActiveTab('profile')} className="relative transition-transform active:scale-95">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" 
            alt="My Profile" 
            className="w-9 h-9 rounded-full object-cover p-[2px] bg-gradient-to-tr from-teal-500 via-indigo-500 to-pink-500"
          />
        </button>

        <h1 className="text-2xl font-serif font-extrabold tracking-tight bg-gradient-to-r from-teal-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Trendora
        </h1>

        <div className="flex items-center space-x-3">
          <button className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition">
            <PlusSquare className="w-6 h-6" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition">
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      {activeTab === 'feed' && (
        <main className="flex-1 w-full">
          {/* Stories Bar */}
          <section className="py-3 px-3 border-b border-slate-200 overflow-x-auto flex space-x-4 no-scrollbar bg-white">
            <div className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer">
              <div className="relative p-[2px] rounded-full border-2 border-dashed border-teal-500">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Your Story" className="w-14 h-14 rounded-full object-cover" />
              </div>
              <span className="text-[11px] text-slate-600 font-medium">შენი სთორი</span>
            </div>

            {stories.map((story) => (
              <div 
                key={story.id} 
                onClick={() => setSelectedStory(story)}
                className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer transition transform active:scale-95"
              >
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-teal-400 via-indigo-500 to-pink-500">
                  <img src={story.image_url} alt={story.user_name} className="w-14 h-14 rounded-full object-cover border-2 border-white" />
                </div>
                <span className="text-[11px] text-slate-600 font-medium">{story.user_name}</span>
              </div>
            ))}
          </section>

          {/* Add Story Form */}
          <div className="p-3 bg-white border-b border-slate-200">
            <form onSubmit={handleAddStory} className="flex gap-2">
              <input
                type="url"
                placeholder="ჩასვი სურათის URL სთორისთვის..."
                value={newStoryUrl}
                onChange={(e) => setNewStoryUrl(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                disabled={isUploading}
                className="bg-teal-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-teal-700 transition"
              >
                {isUploading ? '...' : 'ატვირთვა'}
              </button>
            </form>
          </div>

          <div className="p-4 space-y-6">
            <article className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between p-3.5">
                <div className="flex items-center space-x-3">
                  <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150" alt="User" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                  <div>
                    <h4 className="font-semibold text-xs text-slate-900">Elena Marchetti</h4>
                    <p className="text-[10px] text-slate-400">Milan · 2 სთ-ის წინ</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">Score: 96</span>
              </div>

              {/* Click to Zoom Post Image */}
              <div 
                className="aspect-[4/5] bg-slate-100 relative cursor-pointer"
                onClick={() => setZoomedImage("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800")}
              >
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800" alt="Post" className="w-full h-full object-cover" />
              </div>

              <div className="p-3 bg-slate-50/80 border-b border-slate-100">
                <p className="text-[11px] font-semibold text-slate-500 mb-2">შეაფასე სტილი:</p>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  <button onClick={() => handleReaction('veryGood')} className={`py-1.5 px-1 rounded-xl text-[10px] font-semibold transition-all ${userReaction === 'veryGood' ? 'bg-pink-500 text-white shadow' : 'bg-white text-slate-700 border border-slate-200'}`}>🔥 ძალ. კარგი ({reactions.veryGood})</button>
                  <button onClick={() => handleReaction('good')} className={`py-1.5 px-1 rounded-xl text-[10px] font-semibold transition-all ${userReaction === 'good' ? 'bg-amber-500 text-white shadow' : 'bg-white text-slate-700 border border-slate-200'}`}>✨ კარგი ({reactions.good})</button>
                  <button onClick={() => handleReaction('wonderful')} className={`py-1.5 px-1 rounded-xl text-[10px] font-semibold transition-all ${userReaction === 'wonderful' ? 'bg-teal-500 text-white shadow' : 'bg-white text-slate-700 border border-slate-200'}`}>🌸 მშვენიერი ({reactions.wonderful})</button>
                  <button onClick={() => handleReaction('normal')} className={`py-1.5 px-1 rounded-xl text-[10px] font-semibold transition-all ${userReaction === 'normal' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-700 border border-slate-200'}`}>👍 ნორმალური ({reactions.normal})</button>
                </div>
              </div>

              <div className="p-3.5 space-y-2">
                <div className="flex justify-between items-center text-slate-700">
                  <div className="flex space-x-4">
                    <Heart className="w-5 h-5 cursor-pointer hover:text-pink-500 transition" />
                    <MessageCircle className="w-5 h-5 cursor-pointer hover:text-teal-600 transition" />
                    <Share2 className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition" />
                  </div>
                  <Bookmark className="w-5 h-5 cursor-pointer hover:text-amber-500 transition" />
                </div>
                <p className="text-xs text-slate-800">
                  <span className="font-bold mr-1.5">Elena Marchetti</span>
                  შემოდგომის თბილი ტონები Trendora AI-ს რჩევით! 🧥✨
                </p>
              </div>
            </article>
          </div>
        </main>
      )}

      {/* 2. WARDROBE TAB */}
      {activeTab === 'wardrobe' && (
        <main className="flex-1 w-full p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900">ჩემი გარდერობი</h2>
              <p className="text-xs text-slate-500">შენი ციფრული კოლექცია</p>
            </div>
            <button className="text-xs bg-gradient-to-r from-teal-600 to-indigo-600 text-white px-3.5 py-2 rounded-xl font-medium flex items-center space-x-1.5 shadow-sm active:scale-95 transition">
              <Camera className="w-4 h-4" />
              <span>ფოტოს დამატება</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'კლასიკური პალტო', cat: 'ზედატანი', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400' },
              { title: 'შავი პიჯაკი', cat: 'ოფიციალური', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
              { title: 'თეთრი სნიკერსი', cat: 'ფეხსაცმელი', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
              { title: 'დენიმ შარვალი', cat: 'ქვედატანი', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setZoomedImage(item.img)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm p-2 space-y-1.5 cursor-pointer hover:shadow-md transition"
              >
                <img src={item.img} alt={item.title} className="w-full h-36 object-cover rounded-xl" />
                <h4 className="font-bold text-xs text-slate-800">{item.title}</h4>
                <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md font-medium inline-block">{item.cat}</span>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 3. TRENDORA AI STYLIST TAB */}
      {activeTab === 'ai' && (
        <main className="flex-1 w-full p-4 space-y-4">
          <div className="bg-gradient-to-r from-teal-600 via-indigo-600 to-pink-500 text-white p-5 rounded-3xl shadow-md space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-lg font-bold">Trendora AI სტილისტი</h2>
            </div>
            <p className="text-xs text-teal-50 leading-relaxed">აირჩიე ღონისძიება და AI შეგირჩევს იდეალურ ლუქს შენი გარდერობიდან + ბიუჯეტურ შოპინგს!</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">სად მიდიხარ?</label>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => generateAiOutfit('party')} className={`py-2.5 rounded-xl text-xs font-medium border transition ${eventCategory === 'party' ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200'}`}>🎉 დაბადების დღე</button>
              <button onClick={() => generateAiOutfit('condolence')} className={`py-2.5 rounded-xl text-xs font-medium border transition ${eventCategory === 'condolence' ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200'}`}>🖤 სამძიმარი</button>
              <button onClick={() => generateAiOutfit('casual')} className={`py-2.5 rounded-xl text-xs font-medium border transition ${eventCategory === 'casual' ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200'}`}>☕ მეგობრები</button>
            </div>
          </div>

          {aiRecommendation && (
            <div className="bg-white p-4 rounded-2xl border border-teal-200 shadow-sm space-y-2.5">
              <div className="flex items-center space-x-2 text-teal-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>AI-ს რეკომენდაცია:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{aiRecommendation}</p>
            </div>
          )}
        </main>
      )}

      {/* 4. PROFILE TAB */}
      {activeTab === 'profile' && (
        <main className="flex-1 w-full p-4 space-y-5">
          {!showSettings ? (
            <>
              <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Profile" className="w-20 h-20 rounded-full object-cover p-[2px] bg-gradient-to-tr from-teal-500 to-pink-500" />
                  <div>
                    <h2 className="text-base font-bold text-slate-900">გიორგი</h2>
                    <p className="text-xs text-slate-500">@giorgi_style</p>
                    <span className="text-[10px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full font-bold mt-1 inline-block border border-teal-200">Pro Stylist</span>
                  </div>
                </div>
                <button onClick={() => setShowSettings(true)} className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-white p-3.5 rounded-2xl border border-slate-200 text-center shadow-sm">
                <div>
                  <p className="font-bold text-sm text-slate-900">24</p>
                  <p className="text-[10px] text-slate-400">პოსტი</p>
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">1.2k</p>
                  <p className="text-[10px] text-slate-400">ფოლოუერი</p>
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">450</p>
                  <p className="text-[10px] text-slate-400">ფოლოუინგი</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex space-x-4 border-b border-slate-200 pb-2">
                  <button className="text-xs font-bold text-teal-700 border-b-2 border-teal-700 pb-1 flex items-center space-x-1">
                    <Grid className="w-4 h-4" />
                    <span>პოსტები</span>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
                    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400',
                    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
                    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
                  ].map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt="Grid" 
                      onClick={() => setZoomedImage(img)}
                      className="w-full h-28 object-cover rounded-xl cursor-pointer hover:opacity-90 transition" 
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-bold text-sm text-slate-900">პარამეტრები & კონტროლი</h3>
                <button onClick={() => setShowSettings(false)} className="text-xs text-teal-600 font-bold">დახურვა</button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <button className="w-full py-3 flex items-center justify-between text-slate-700 hover:text-teal-600 transition">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-4 h-4 text-slate-400" />
                    <span>პაროლის ცვლილება & უსაფრთხოება</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
                <button className="w-full py-3 flex items-center justify-between text-slate-700 hover:text-teal-600 transition">
                  <div className="flex items-center space-x-3">
                    <Share2 className="w-4 h-4 text-slate-400" />
                    <span>პროფილის გაზიარება & გადამისამართება</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
                <button className="w-full py-3 flex items-center justify-between text-slate-700 hover:text-teal-600 transition">
                  <div className="flex items-center space-x-3">
                    <Sliders className="w-4 h-4 text-slate-400" />
                    <span>კონფიდენციალურობა & ანგარიშის მართვა</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
                <button className="w-full py-3 flex items-center space-x-3 text-pink-600 font-bold">
                  <LogOut className="w-4 h-4" />
                  <span>ანგარიშიდან გამოსვლა (Logout)</span>
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* STORY VIEWER MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col justify-between p-4 backdrop-blur-md">
          <div className="flex justify-between items-center text-white z-10 pt-2">
            <span className="font-bold text-sm">{selectedStory.user_name}</span>
            <button onClick={() => setSelectedStory(null)} className="p-1 rounded-full bg-white/20 text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="relative flex-1 my-4 flex items-center justify-center">
            <img src={selectedStory.image_url} alt="Story view" className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl" />
          </div>
        </div>
      )}

      {/* IMAGE ZOOM MODAL */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)} 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out"
        >
          <button className="absolute top-4 right-4 p-2 text-white bg-white/20 rounded-full">
            <X className="w-6 h-6" />
          </button>
          <img src={zoomedImage} alt="Zoomed view" className="max-h-[90vh] max-w-full object-contain rounded-xl shadow-2xl" />
        </div>
      )}

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-6 flex justify-between items-center max-w-md mx-auto z-40 shadow-lg">
        <button onClick={() => setActiveTab('feed')} className={`flex flex-col items-center transition ${activeTab === 'feed' ? 'text-teal-600 font-bold' : 'text-slate-400'}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">მთავარი</span>
        </button>
        <button onClick={() => setActiveTab('wardrobe')} className={`flex flex-col items-center transition ${activeTab === 'wardrobe' ? 'text-teal-600 font-bold' : 'text-slate-400'}`}>
          <Shirt className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">გარდერობი</span>
        </button>
        <button onClick={() => setActiveTab('ai')} className={`flex flex-col items-center transition ${activeTab === 'ai' ? 'text-teal-600 font-bold' : 'text-slate-400'}`}>
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Trendora AI</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center transition ${activeTab === 'profile' ? 'text-teal-600 font-bold' : 'text-slate-400'}`}>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Avatar" className={`w-5 h-5 rounded-full object-cover ${activeTab === 'profile' ? 'ring-2 ring-teal-600' : ''}`} />
          <span className="text-[10px] mt-0.5">პროფილი</span>
        </button>
      </nav>

    </div>
  );
}
