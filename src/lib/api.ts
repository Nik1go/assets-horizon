
import { supabase, AssetCategoryDB, AssetDB, getCurrentUser } from './supabase';

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
  const { data: categories, error: categoriesError } = await supabase
    .from('asset_categories')
    .select('*');

  if (categoriesError) {
    console.error('Erreur lors de la récupération des catégories:', categoriesError);
    throw categoriesError;
  }

  // Récupérer l'utilisateur connecté
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  // Récupérer les actifs de l'utilisateur
  const { data: assets, error: assetsError } = await supabase
    .from('assets')
    .select('*')
    .eq('user_id', user.id);

  if (assetsError) {
    console.error('Erreur lors de la récupération des actifs:', assetsError);
    throw assetsError;
  }

  // Calculer la valeur totale et le changement pour chaque catégorie
  return (categories as AssetCategoryDB[]).map(category => {
    const categoryAssets = (assets || []).filter(asset => asset.category_id === category.id);
    const totalValue = categoryAssets.reduce((sum, asset) => sum + (asset.value || 0), 0);
    
    // Calculer le changement (en supposant que la valeur avant changement est value / (1 + change/100))
    const totalValueBefore = categoryAssets.reduce(
      (sum, asset) => sum + ((asset.value || 0) / (1 + asset.change / 100)),
      0
    );
    
    const changeValue = totalValue - totalValueBefore;
    const changePercentage = totalValueBefore > 0 
      ? (changeValue / totalValueBefore) * 100 
      : 0;
    
    return {
      id: category.id,
      name: category.name,
      totalValue,
      change: {
        value: parseFloat(changeValue.toFixed(2)),
        percentage: parseFloat(changePercentage.toFixed(2))
      }
    };
  });
};

export const fetchUserAssets = async (): Promise<Asset[]> => {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Erreur lors de la récupération des actifs:', error);
    throw error;
  }

  return data as Asset[] || [];
};

export const addAsset = async (asset: Omit<Asset, 'id' | 'user_id' | 'value'>): Promise<Asset> => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Utilisateur non connecté');
  }

  const newAsset = {
    ...asset,
    user_id: user.id
  };

  const { data, error } = await supabase
    .from('assets')
    .insert([newAsset])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de l\'ajout de l\'actif:', error);
    throw error;
  }

  return data as Asset;
};

export const updateAsset = async (id: string, updates: Partial<Omit<Asset, 'id' | 'user_id'>>): Promise<Asset> => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Utilisateur non connecté');
  }

  const { data, error } = await supabase
    .from('assets')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la mise à jour de l\'actif:', error);
    throw error;
  }

  return data as Asset;
};

export const deleteAsset = async (id: string): Promise<void> => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Utilisateur non connecté');
  }

  const { error } = await supabase
    .from('assets')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

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
