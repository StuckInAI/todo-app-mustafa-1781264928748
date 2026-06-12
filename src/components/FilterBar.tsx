import clsx from 'clsx';
import { Search, Trash2 } from 'lucide-react';
import { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  search: string;
  setSearch: (s: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  categories: string[];
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  categories,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex flex-col gap-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={clsx(
                'px-3 py-1 rounded-lg text-sm font-medium transition',
                filter === f.value
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-500 hover:bg-slate-100'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-2 py-1 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600 transition"
            >
              <Trash2 size={14} />
              Clear done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
