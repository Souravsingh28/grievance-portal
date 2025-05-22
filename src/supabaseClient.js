
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://kncjphxacezwgwxnbnqv.supabase.co'; // Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuY2pwaHhhY2V6d2d3eG5ibnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MjExMDIsImV4cCI6MjA2MzQ5NzEwMn0.i6cZpEkByZaKJARZIigf6u_h7D1SIuGI57tGzOFOn6Y'; // Replace with your Supabase anon/public key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
