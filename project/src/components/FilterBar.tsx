import { ChevronDown } from 'lucide-react';
import type { DealCategory } from '@/lib/supabase';

type FilterBarProps = {
  activeStore: string;
  onStoreChange: (store: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  counts: Record<string, number>;
};

const storeFilters = ['All', 'Coles', 'Woolworths', 'Aldi', 'Big W', 'Kmart', 'OzBargain'];

const categoryFilters: (string | DealCategory)[] = [
  'All Categories',
  'Groceries',
  'Electronics',
  'Home & Living',
  'Fashion',
  'Clearance',
];

export default function FilterBar({
  activeStore,
  onStoreChange,
  activeCategory,
  onCategoryChange,
  counts,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Store filter pills */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {storeFilters.map((filter) => {
          const isActive = activeStore === filter;
          return (
            <button
              key={filter}
              onClick={() => onStoreChange(filter)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {filter}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {counts[filter] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category dropdown */}
      <div className="relative inline-block">
        <select
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none w-full sm:w-auto pl-4 pr-10 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer transition-colors"
        >
          {categoryFilters.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}
