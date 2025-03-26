
-- Création de la table des catégories d'actifs
CREATE TABLE IF NOT EXISTS asset_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table des actifs
CREATE TABLE IF NOT EXISTS assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  ticker TEXT NOT NULL,
  quantity NUMERIC NOT NULL DEFAULT 0,
  price NUMERIC NOT NULL DEFAULT 0,
  value NUMERIC GENERATED ALWAYS AS (quantity * price) STORED,
  change NUMERIC NOT NULL DEFAULT 0,
  category_id UUID NOT NULL REFERENCES asset_categories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création des règles de sécurité (RLS)
ALTER TABLE asset_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- Politique pour les catégories d'actifs (accessible par tous)
CREATE POLICY "Les catégories sont accessibles par tous les utilisateurs authentifiés"
ON asset_categories FOR SELECT
TO authenticated
USING (true);

-- Politiques pour les actifs (accessibles uniquement par le propriétaire)
CREATE POLICY "Les actifs sont accessibles uniquement par le propriétaire"
ON assets FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Les actifs ne peuvent être insérés que par le propriétaire"
ON assets FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Les actifs ne peuvent être mis à jour que par le propriétaire"
ON assets FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Les actifs ne peuvent être supprimés que par le propriétaire"
ON assets FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Insérer des catégories d'actifs par défaut
INSERT INTO asset_categories (name) VALUES
('Actions'),
('Crypto'),
('Immobilier'),
('Liquidités'),
('Obligations')
ON CONFLICT DO NOTHING;
