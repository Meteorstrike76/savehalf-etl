import { useState } from 'react';
import { Heart, Copy, Check, Flame, ExternalLink } from 'lucide-react';
import type { Deal, StoreCategory } from '@/lib/supabase';

type ProductCardProps = {
  deal: Deal;
  isSaved: boolean;
  onToggleSave: (dealId: string) => void;
};

const storeStyles: Record<StoreCategory, { pill: string; dot: string }> = {
  Coles: { pill: 'bg-red-500/10 text-red-600', dot: 'bg-red-500' },
  Woolworths: { pill: 'bg-green-500/10 text-green-600', dot: 'bg-green-500' },
  Aldi: { pill: 'bg-amber-500/10 text-amber-600', dot: 'bg-amber-500' },
  'Big W': { pill: 'bg-blue-500/10 text-blue-600', dot: 'bg-blue-500' },
  Kmart: { pill: 'bg-slate-500/10 text-slate-700', dot: 'bg-slate-600' },
  OzBargain: { pill: 'bg-orange-500/10 text-orange-600', dot: 'bg-orange-500' },
};

export default function ProductCard({ deal, isSaved, onToggleSave }: ProductCardProps) {
  const [copied, setCopied] = useState(false);
  const style = storeStyles[deal.storeCategory] ?? storeStyles.Coles;
  const savings = deal.originalPrice ? deal.originalPrice - deal.discountPrice : 0;
  const discountPercent = deal.originalPrice
    ? Math.round((savings / deal.originalPrice) * 100)
    : 50;

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (deal.couponCode) {
      navigator.clipboard.writeText(deal.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={deal.imageUrl}
          alt={deal.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold text-red-600 bg-red-500/10 rounded-full backdrop-blur-sm">
            {discountPercent}% OFF
          </span>
        </div>
        {deal.upvotes !== undefined && deal.upvotes > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white bg-slate-900/70 rounded-full backdrop-blur-sm">
              <Flame className="w-3 h-3 text-orange-400" />
              {deal.upvotes}
            </span>
          </div>
        )}
        <button
          onClick={() => onToggleSave(deal.id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
            isSaved
              ? 'bg-red-500 text-white hover:bg-red-600 scale-110'
              : 'bg-white/90 text-slate-600 hover:bg-white hover:text-red-500'
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save to list'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded ${style.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {deal.storeCategory}
          </span>
          <span className="text-xs text-slate-400">{deal.category}</span>
          {deal.sourceFeed === 'ozbargain' && (
            <span className="text-xs font-medium text-orange-500">via OzBargain</span>
          )}
        </div>

        <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 min-h-[2.5rem]">
          {deal.title}
        </h3>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-rose-600">
            ${deal.discountPrice.toFixed(2)}
          </span>
          {deal.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              ${deal.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          {savings > 0 ? (
            <span className="text-xs font-medium text-green-600">
              Save ${savings.toFixed(2)}
            </span>
          ) : (
            <span className="text-xs text-slate-400">Clearance deal</span>
          )}
          {isSaved && (
            <span className="text-xs text-red-500 font-medium">Saved</span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          {deal.couponCode && (
            <button
              onClick={handleCopyCode}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  {deal.couponCode}
                </>
              )}
            </button>
          )}
          <a
            href={deal.dealUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-lg hover:shadow-md transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Deal
          </a>
        </div>
      </div>
    </div>
  );
}
