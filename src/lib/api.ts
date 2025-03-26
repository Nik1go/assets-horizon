
import { supabase } from './supabase';

// Types pour les actifs du portefeuille
export interface AssetCategory {
  id: string;
  name: string;
  totalValue: number;
  change: { value: number; percentage: number };
}

export interface Asset {
  id: string;
  name: string;
  ticker: string;
  quantity: number;
  price: number;
  value: number;
  change: number;
  category_id: string;
  user_id: string;
}

// Fonctions pour gérer les catégories d'actifs
export const fetchAssetCategories = async (): Promise<AssetCategory[]> => {
  const { data, error } = await supabase
    .from('asset_categories')
    .select('*');

  if (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }

  return data || [];
};

export const fetchUserAssets = async (userId: string): Promise<Asset[]> => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Erreur lors de la récupération des actifs:', error);
    throw error;
  }

  return data || [];
};

export const addAsset = async (asset: Omit<Asset, 'id'>): Promise<Asset> => {
  const { data, error } = await supabase
    .from('assets')
    .insert([asset])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de l\'ajout de l\'actif:', error);
    throw error;
  }

  return data;
};

export const updateAsset = async (id: string, updates: Partial<Asset>): Promise<Asset> => {
  const { data, error } = await supabase
    .from('assets')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la mise à jour de l\'actif:', error);
    throw error;
  }

  return data;
};

export const deleteAsset = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('assets')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erreur lors de la suppression de l\'actif:', error);
    throw error;
  }
};

// Fonction pour calculer les totaux du portefeuille par catégorie
export const calculatePortfolioSummary = (assets: Asset[]): AssetCategory[] => {
  // Grouper les actifs par catégorie
  const categoriesMap = assets.reduce((acc, asset) => {
    if (!acc[asset.category_id]) {
      acc[asset.category_id] = {
        id: asset.category_id,
        name: '', // Sera rempli plus tard
        assets: [],
        totalValue: 0,
        change: { value: 0, percentage: 0 }
      };
    }
    
    acc[asset.category_id].assets.push(asset);
    acc[asset.category_id].totalValue += asset.value;
    
    return acc;
  }, {} as Record<string, any>);
  
  // Calculer les changements pour chaque catégorie
  return Object.values(categoriesMap).map(category => {
    const totalValueBefore = category.assets.reduce(
      (sum: number, asset: Asset) => sum + (asset.value / (1 + asset.change / 100)),
      0
    );
    
    const changeValue = category.totalValue - totalValueBefore;
    const changePercentage = totalValueBefore > 0 
      ? (changeValue / totalValueBefore) * 100 
      : 0;
    
    return {
      ...category,
      change: {
        value: parseFloat(changeValue.toFixed(2)),
        percentage: parseFloat(changePercentage.toFixed(2))
      }
    };
  });
};
