
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://haivsnym.wzybjshakqog.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhaXZzbnltd3pqeWJzaGFrcW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Nzk2MDcsImV4cCI6MjA1ODU1NTYwN30.An_X8A8M4_lTKSozMgpVMVTPxLk_0P7BFfbN8rrdrOg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
