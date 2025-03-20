
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link to="/" className="text-lg font-medium">
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent font-bold">
                MonPatrimoine
              </span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Application de suivi de portefeuille multi-actifs en temps réel
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Accueil
            </Link>
            <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Recherche
            </Link>
            <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Portefeuille
            </Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MonPatrimoine. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
