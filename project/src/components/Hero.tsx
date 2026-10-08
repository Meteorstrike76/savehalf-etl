import { ArrowDown, TrendingDown, ShoppingBag, PiggyBank } from 'lucide-react';

type HeroProps = {
  onBrowse: () => void;
  dealCount: number;
};

export default function Hero({ onBrowse, dealCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-red-500/10 border border-red-500/20">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-400">
              {dealCount} active clearance deals
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Stop paying full price
            <br />
            for <span className="text-red-400">groceries.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            SaveHalf tracks real-time clearance deals across Coles, Woolworths, Aldi, Big W, Kmart & OzBargain.
            Save up to 50% on your weekly shop, effortlessly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBrowse}
              className="flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Deals
            </button>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <PiggyBank className="w-5 h-5" />
              <span>Track your savings across all stores</span>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">50%</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Off every deal</div>
            </div>
            <div className="text-center border-x border-slate-700">
              <div className="text-2xl sm:text-3xl font-bold text-white">7</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Retailers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">Live</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Deal tracking</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-bounce">
          <ArrowDown className="w-5 h-5 text-slate-400" />
        </div>
      </div>
    </section>
  );
}
