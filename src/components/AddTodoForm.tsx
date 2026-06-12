import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-emerald-600' },
  { value: 'medium', label: 'Medium', color: 'text-amber-500' },
  { value: 'high', label: 'High', color: 'text-rose-500' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [expanded, setExpanded] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setCategory('');
    setPriority('medium');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm p-4 mb-4"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="border border-slate-200 rounded-xl px-3 py-2 text-slate-500 hover:bg-slate-50 transition flex items-center gap-1"
        >
          <ChevronDown
            size={16}
            className={clsx('transition-transform', { 'rotate-180': expanded })}
          />
        </button>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-2 flex items-center gap-2 font-medium transition shadow-sm"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {expanded && (
        <div className="mt-3 flex flex-wrap gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 font-medium">Priority</label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-sm font-medium border transition',
                    priority === p.value
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-32">
            <label className="text-xs text-slate-500 font-medium">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              placeholder="e.g. Work, Personal..."
              className="border border-slate-200 rounded-xl px-3 py-1 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>
        </div>
      )}
    </form>
  );
}
