import { Heart, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

type NavbarProps = {
  currentPage: 'home' | 'saved';
  onNavigate: (page: 'home' | 'saved') => void;
  onOpenAuth: () => void;
};

export default function Navbar({ currentPage, onNavigate, onOpenAuth }: NavbarProps) {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-md group-hover:shadow-lg transition-shadow">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Save<span className="text-red-500">Half</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-red-500'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Browse Deals
            </button>
            {user && (
              <button
                onClick={() => onNavigate('saved')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'saved'
                    ? 'text-red-500'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                My Saved Deals
              </button>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 hidden lg:inline">
                  {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-lg shadow-sm hover:shadow-md hover:from-red-600 hover:to-rose-700 transition-all"
              >
                Login / Signup
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-3">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileOpen(false);
              }}
              className="block w-full text-left px-2 py-2 text-sm font-medium text-slate-700"
            >
              Browse Deals
            </button>
            {user && (
              <button
                onClick={() => {
                  onNavigate('saved');
                  setMobileOpen(false);
                }}
                className="block w-full text-left px-2 py-2 text-sm font-medium text-slate-700"
              >
                My Saved Deals
              </button>
            )}
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-slate-700"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileOpen(false);
                }}
                className="w-full px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-lg"
              >
                Login / Signup
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
