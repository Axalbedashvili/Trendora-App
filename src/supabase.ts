import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bnhcpwhdfkgzxirfyngs.supabase.co';
const supabaseAnonKey = 'Sb_publishable_QSRLD1rFkVs9gtXf1ZqkFQ_xANDKggP';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
