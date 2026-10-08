import { Trash2, TrendingDown, Wallet, ShoppingBag, ShoppingBasket } from 'lucide-react';
import type { SavedDeal, StoreCategory } from '@/lib/supabase';

type SavedDealsDashboardProps = {
  savedDeals: SavedDeal[];
  onRemove: (savedDealId: string) => void;
  onBrowse: () => void;
};

const storeStyles: Record<StoreCategory, { pill: string; dot: string }> = {
  Coles: { pill: 'bg-red-500/10 text-red-600', dot: 'bg-red-500' },
  Woolworths: { pill: 'bg-green-500/10 text-green-600', dot: 'bg-green-500' },
  Aldi: { pill: 'bg-amber-500/10 text-amber-600', dot: 'bg-amber-500' },
  'Big W': { pill: 'bg-blue-500/10 text-blue-600', dot: 'bg-blue-500' },
  Kmart: { pill: 'bg-slate-500/10 text-slate-700', dot: 'bg-slate-600' },
  OzBargain: { pill: 'bg-orange-500/10 text-orange-600', dot: 'bg-orange-500' },
};

export default function SavedDealsDashboard({
  savedDeals,
  onRemove,
  onBrowse,
}: SavedDealsDashboardProps) {
  const totalSavings = savedDeals.reduce(
    (sum, sd) => sum + ((sd.deal.originalPrice ?? 0) - sd.deal.discountPrice),
    0
  );
  const totalOriginal = savedDeals.reduce((sum, sd) => sum + (sd.deal.originalPrice ?? 0), 0);
  const totalSale = savedDeals.reduce((sum, sd) => sum + sd.deal.discountPrice, 0);

  const storeBreakdown = savedDeals.reduce(
    (acc, sd) => {
      const store = sd.deal.storeCategory;
      if (!acc[store]) acc[store] = 0;
      acc[store] += (sd.deal.originalPrice ?? 0) - sd.deal.discountPrice;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Saved Deals</h1>
          <p className="mt-2 text-slate-500">
            Track your clearance savings across all retailers.
          </p>
        </div>

        {/* Savings summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-white/90">Total Savings</span>
            </div>
            <div className="text-3xl font-bold">${totalSavings.toFixed(2)}</div>
            <div className="text-sm text-white/70 mt-1">
              across {savedDeals.length} {savedDeals.length === 1 ? 'deal' : 'deals'}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-slate-500">Original Cost</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">
              ${totalOriginal.toFixed(2)}
            </div>
            <div className="text-sm text-slate-400 mt-1">full price total</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-slate-600" />
              </div>
              <span className="text-sm font-medium text-slate-500">You Pay</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">
              ${totalSale.toFixed(2)}
            </div>
            <div className="text-sm text-slate-400 mt-1">with clearance deals</div>
          </div>
        </div>

        {/* Store breakdown */}
        {Object.keys(storeBreakdown).length > 0 && (
          <div className="mb-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">
              Savings by Store
            </h3>
            <div className="space-y-3">
              {Object.entries(storeBreakdown).map(([store, savings]) => {
                const style = storeStyles[store as StoreCategory] ?? storeStyles.Coles;
                return (
                  <div key={store} className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-1.5 text-sm font-medium w-28 ${style.pill} px-2 py-0.5 rounded`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {store}
                    </span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${totalSavings > 0 ? (savings / totalSavings) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-900 w-16 text-right">
                      ${savings.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Saved deals list */}
        {savedDeals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 sm:p-16 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-50 flex items-center justify-center">
              <ShoppingBasket className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No saved deals yet</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
              Browse clearance deals and tap the heart icon to start tracking your savings.
            </p>
            <button
              onClick={onBrowse}
              className="mt-6 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Browse Deals
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {savedDeals.map((sd) => {
              const savings = (sd.deal.originalPrice ?? 0) - sd.deal.discountPrice;
              const style = storeStyles[sd.deal.storeCategory] ?? storeStyles.Coles;
              return (
                <div
                  key={sd.id}
                  className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
                >
                  <img
                    src={sd.deal.imageUrl}
                    alt={sd.deal.title}
                    loading="lazy"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded ${style.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {sd.deal.storeCategory}
                      </span>
                      <span className="text-xs text-slate-400">{sd.deal.category}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {sd.deal.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-rose-600">
                        ${sd.deal.discountPrice.toFixed(2)}
                      </span>
                      {sd.deal.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ${sd.deal.originalPrice.toFixed(2)}
                        </span>
                      )}
                      {savings > 0 && (
                        <span className="text-xs font-medium text-green-600">
                          Save ${savings.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(sd.id)}
                    className="flex-shrink-0 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
