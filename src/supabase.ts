export const supabase = {
  auth: { getUser: () => Promise.resolve({ data: { user: null } }) },
  from: () => ({ select: () => Promise.resolve({ data: [], error: null }) })
};
