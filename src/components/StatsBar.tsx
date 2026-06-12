import clsx from 'clsx';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
};

export default function StatsBar({ activeCount, completedCount }: StatsBarProps) {
  const total = activeCount + completedCount;
  const pct = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex items-center gap-4">
      <div className="flex gap-4 flex-1">
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-500">{activeCount}</p>
          <p className="text-xs text-slate-500">Remaining</p>
        </div>
        <div className="w-px bg-slate-200" />
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-500">{completedCount}</p>
          <p className="text-xs text-slate-500">Completed</p>
        </div>
        <div className="w-px bg-slate-200" />
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-700">{total}</p>
          <p className="text-xs text-slate-500">Total</p>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className={clsx('h-2 rounded-full transition-all duration-500', {
              'bg-emerald-400': pct === 100,
              'bg-indigo-400': pct < 100,
            })}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
