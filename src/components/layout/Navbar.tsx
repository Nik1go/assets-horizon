
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, PieChart, Menu, X, LogOut, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/search', label: 'Recherche', icon: Search },
    { path: '/portfolio', label: 'Portefeuille', icon: PieChart },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate('/login');
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-medium transition-opacity hover:opacity-80"
          >
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent font-bold">
              MonPatrimoine
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    "hover:text-primary focus-ring",
                    isActive ? "text-primary" : "text-foreground/70"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <link.icon size={18} />
                    <span>{link.label}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* User info and logout */}
            {user && (
              <div className="flex items-center ml-4 space-x-2">
                <div className="flex items-center gap-1 text-sm text-foreground/70">
                  <User size={16} />
                  <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center gap-1"
                >
                  <LogOut size={16} />
                  <span className="hidden md:inline">Déconnexion</span>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full focus-ring text-foreground/70 hover:text-primary transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <motion.div
          className={cn(
            "fixed inset-x-0 top-[60px] bg-white/95 dark:bg-black/95 backdrop-blur-lg z-50 shadow-lg",
            !isOpen && "hidden"
          )}
          initial={{ opacity: 0, height: 0 }}
          animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto py-4 px-6 flex flex-col space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "p-3 rounded-lg transition-colors flex items-center gap-3",
                    "hover:bg-muted focus-ring",
                    isActive ? "bg-muted text-primary" : "text-foreground/70"
                  )}
                >
                  <link.icon size={20} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            
            {/* Logout button for mobile */}
            {user && (
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="mt-4 w-full justify-start"
              >
                <LogOut size={18} className="mr-2" />
                Déconnexion
              </Button>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
