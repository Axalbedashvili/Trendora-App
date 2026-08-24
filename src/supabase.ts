export const supabase = {
  auth: { 
    getUser: () => Promise.resolve({ data: { user: null } }),
    signOut: () => Promise.resolve()
  },
  from: () => ({ 
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null })
  })
};
