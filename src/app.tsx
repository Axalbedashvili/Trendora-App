import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { 
  User, 
  PlusCircle, 
  Image as ImageIcon, 
  Sparkles, 
  ShoppingBag, 
  CheckCircle, 
  TrendingUp 
} from 'lucide-react';

interface Story {
  id: string;
  user_name: string;
  image_url: string;
  created_at: string;
}

interface Profile {
  username: string;
  bio: string;
  business_info: string;
  avatar_url: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'feed' | 'profile'>('feed');
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Profile Form State
  const [profile, setProfile] = useState<Profile>({
    username: 'გიორგი',
    bio: 'Trendora VIP Member',
    business_info: 'Style & Trend Curator',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  });

  // Story Upload State
  const [newStoryUrl, setNewStoryUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // 1. Fetch Stories from Supabase
  const fetchStories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setStories(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // 2. Add New Story
  const handleAddStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryUrl) return;

    setIsUploading(true);
    const { error } = await supabase.from('stories').insert([
      {
        user_name: profile.username,
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between max-w-md mx-auto shadow-2xl border-x border-slate-800">
      
      {/* Header */}
      <header className="p-4 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-950/80 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          TRENDORA
        </h1>
        <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Live Database</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'feed' ? (
          <div className="space-y-6">
            
            {/* Story Add Box */}
            <form onSubmit={handleAddStory} className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex gap-2">
              <input
                type="url"
                placeholder="ჩასვი სურათის URL სთორისთვის..."
                value={newStoryUrl}
                onChange={(e) => setNewStoryUrl(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                disabled={isUploading}
                className="bg-gradient-to-r from-pink-500 to-violet-600 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 hover:opacity-90 disabled:opacity-50"
              >
                <PlusCircle className="w-4 h-4" />
                {isUploading ? '...' : 'დამატება'}
              </button>
            </form>

            {/* Stories List */}
            <div>
              <h2 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                აქტიური სთორები ({stories.length})
              </h2>
              {loading ? (
                <div className="text-center py-8 text-xs text-slate-500">იტვირთება...</div>
              ) : stories.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                  ჯერ სთორები არ არის. დაამატე პირველი!
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {stories.map((story) => (
                    <div key={story.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 group">
                      <img src={story.image_url} alt="Story" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-3 flex flex-col justify-end">
                        <span className="text-xs font-medium text-white">{story.user_name}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(story.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Profile Tab */
          <div className="space-y-4">
            <div className="flex flex-col items-center text-center p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-pink-500 mb-2"
              />
              <h2 className="font-bold text-base">{profile.username}</h2>
              <p className="text-xs text-pink-400 mt-0.5">{profile.business_info}</p>
              <p className="text-xs text-slate-400 mt-2">{profile.bio}</p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">პროფილის პარამეტრები</h3>
              <div>
                <label className="text-[10px] text-slate-400">სახელი</label>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">ბიზნეს ინფო / სტატუსი</label>
                <input
                  type="text"
                  value={profile.business_info}
                  onChange={(e) => setProfile({ ...profile, business_info: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">ბიოგრაფია (Bio)</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs mt-1 resize-none h-16"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="p-3 border-t border-slate-800 bg-slate-950 flex justify-around items-center">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 text-xs ${activeTab === 'feed' ? 'text-pink-500' : 'text-slate-500'}`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Feed</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 text-xs ${activeTab === 'profile' ? 'text-pink-500' : 'text-slate-500'}`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </nav>

    </div>
  );
}
