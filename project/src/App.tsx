import { useCallback, useEffect, useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { normalizeDeal, normalizeSavedDeal, supabase, type Deal, type SavedDeal } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import ProductCard from '@/components/ProductCard';
import AuthModal from '@/components/AuthModal';
import SavedDealsDashboard from '@/components/SavedDealsDashboard';

function SaveHalfApp() {
  const { user, loading: authLoading } = useAuth();
  const [page, setPage] = useState<'home' | 'saved'>('home');
  const [authOpen, setAuthOpen] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [dealsLoading, setDealsLoading] = useState(true);
  const [activeStore, setActiveStore] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedDealIds, setSavedDealIds] = useState<Set<string>>(new Set());
  const [savedDeals, setSavedDeals] = useState<SavedDeal[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Fetch deals
  useEffect(() => {
    let active = true;
    (async () => {
      setDealsLoading(true);
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('published_at', { ascending: false });
      if (!active) return;
      if (!error && data) {
        setDeals(data.map(normalizeDeal));
      }
      setDealsLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  // Fetch saved deals when user changes
  useEffect(() => {
    if (!user) {
      setSavedDealIds(new Set());
      setSavedDeals([]);
      return;
    }
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from('saved_deals')
        .select('*, deal:deals(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (!active) return;
      if (!error && data) {
        const normalizedSavedDeals = data.flatMap((row) => {
          const savedDeal = normalizeSavedDeal(row);
          return savedDeal ? [savedDeal] : [];
        });
        setSavedDeals(normalizedSavedDeals);
        setSavedDealIds(new Set(normalizedSavedDeals.map((sd) => sd.deal_id)));
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleToggleSave = useCallback(
    async (dealId: string) => {
      if (!user) {
        setAuthOpen(true);
        showToast('Sign in to save deals and track your savings');
        return;
      }

      if (savedDealIds.has(dealId)) {
        const { error } = await supabase
          .from('saved_deals')
          .delete()
          .eq('user_id', user.id)
          .eq('deal_id', dealId);
        if (!error) {
          setSavedDealIds((prev) => {
            const next = new Set(prev);
            next.delete(dealId);
            return next;
          });
          setSavedDeals((prev) => prev.filter((sd) => sd.deal_id !== dealId));
          showToast('Removed from saved deals');
        }
      } else {
        const { error } = await supabase
          .from('saved_deals')
          .insert({ deal_id: dealId });
        if (!error) {
          setSavedDealIds((prev) => new Set(prev).add(dealId));
          const deal = deals.find((d) => d.id === dealId);
          if (deal) {
            const newSaved: SavedDeal = {
              id: crypto.randomUUID(),
              user_id: user.id,
              deal_id: dealId,
              created_at: new Date().toISOString(),
              deal,
            };
            setSavedDeals((prev) => [newSaved, ...prev]);
          }
          showToast('Saved! Track your savings in My Saved Deals');
        }
      }
    },
    [user, savedDealIds, deals, showToast]
  );

  const handleRemoveSaved = useCallback(
    async (savedDealId: string) => {
      const target = savedDeals.find((sd) => sd.id === savedDealId);
      const { error } = await supabase
        .from('saved_deals')
        .delete()
        .eq('id', savedDealId);
      if (!error) {
        setSavedDeals((prev) => prev.filter((sd) => sd.id !== savedDealId));
        if (target) {
          setSavedDealIds((prev) => {
            const next = new Set(prev);
            next.delete(target.deal_id);
            return next;
          });
        }
        showToast('Removed from saved deals');
      }
    },
    [savedDeals, showToast]
  );

  // Compute store filter counts
  const storeCounts: Record<string, number> = {
    All: deals.length,
    Coles: deals.filter((d) => d.storeCategory === 'Coles').length,
    Woolworths: deals.filter((d) => d.storeCategory === 'Woolworths').length,
    Aldi: deals.filter((d) => d.storeCategory === 'Aldi').length,
    'Big W': deals.filter((d) => d.storeCategory === 'Big W').length,
    Kmart: deals.filter((d) => d.storeCategory === 'Kmart').length,
    OzBargain: deals.filter((d) => d.storeCategory === 'OzBargain').length,
  };

  const filteredDeals = deals.filter((d) => {
    const matchesStore = activeStore === 'All' || d.storeCategory === activeStore;
    const matchesCategory =
      activeCategory === 'All Categories' || d.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStore && matchesCategory && matchesSearch;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        onOpenAuth={() => setAuthOpen(true)}
      />

      {page === 'home' && (
        <>
          <Hero onBrowse={() => document.getElementById('deals-grid')?.scrollIntoView({ behavior: 'smooth' })} dealCount={deals.length} />

          <section id="deals-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">All Deals</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Real-time deals from Coles, Woolworths, Aldi, Big W, Kmart & OzBargain
                </p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search deals..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div className="mb-6">
              <FilterBar
                activeStore={activeStore}
                onStoreChange={setActiveStore}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                counts={storeCounts}
              />
            </div>

            {dealsLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
              </div>
            ) : filteredDeals.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-slate-400 text-lg">No deals found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredDeals.map((deal) => (
                  <ProductCard
                    key={deal.id}
                    deal={deal}
                    isSaved={savedDealIds.has(deal.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {page === 'saved' && (
        <SavedDealsDashboard
          savedDeals={savedDeals}
          onRemove={handleRemoveSaved}
          onBrowse={() => setPage('home')}
        />
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="px-5 py-3 bg-slate-900 text-white text-sm font-medium rounded-xl shadow-xl">
            {toast}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-rose-600">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-sm font-bold text-slate-900">SaveHalf</span>
            </div>
            <p className="text-xs text-slate-400">
              Tracking clearance deals across Coles, Woolworths, Aldi, Big W, Kmart & OzBargain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SaveHalfApp />
    </AuthProvider>
  );
}
