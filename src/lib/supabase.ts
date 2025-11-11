
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://acphqzjulsiaznhjrwnm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcGhxemp1bHNpYXpuaGpyd25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTgzMDAsImV4cCI6MjA3ODQzNDMwMH0.zycXDv-5niM7WW68rGwDXO8PmdBEraY4P79uxR_Q7RY';

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
