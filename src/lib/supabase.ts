
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://haivsnym.wzybjshakqog.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhaXZzbnltd3pqeWJzaGFrcW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Nzk2MDcsImV4cCI6MjA1ODU1NTYwN30.An_X8A8M4_lTKSozMgpVMVTPxLk_0P7BFfbN8rrdrOg';

// Créer le client Supabase avec des types
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Fonction d'aide pour vérifier si l'utilisateur est connecté
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Types pour la base de données
export type AssetCategoryDB = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type AssetDB = {
  id: string;
  name: string;
  ticker: string;
  quantity: number;
  price: number;
  value?: number; // Champ calculé
  change: number;
  category_id: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};
