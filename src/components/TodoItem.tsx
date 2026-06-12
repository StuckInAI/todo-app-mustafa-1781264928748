import { useState } from 'react';
import { Check, Trash2, Pencil, X, Save, Tag } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';
import { formatDate } from '@/lib/utils';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_STYLES = {
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-rose-100 text-rose-700 border-rose-200',
};

const PRIORITY_DOT = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-500',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    onEdit(todo.id, editText);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li
      className={clsx(
        'bg-white rounded-2xl shadow-sm p-4 flex items-start gap-3 group transition',
        todo.completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition',
          todo.completed
            ? 'bg-emerald-500 border-emerald-500 text-white'
            : 'border-slate-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check size={12} strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-indigo-300 rounded-lg px-2 py-1 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        ) : (
          <p
            className={clsx(
              'text-slate-700 text-sm leading-snug break-words',
              todo.completed && 'line-through text-slate-400'
            )}
          >
            {todo.text}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 mt-2">
          {/* Priority badge */}
          <span
            className={clsx(
              'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border',
              PRIORITY_STYLES[todo.priority]
            )}
          >
            <span className={clsx('w-1.5 h-1.5 rounded-full', PRIORITY_DOT[todo.priority])} />
            {todo.priority}
          </span>

          {/* Category badge */}
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            <Tag size={10} />
            {todo.category}
          </span>

          {/* Date */}
          <span className="text-xs text-slate-400">{formatDate(todo.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 transition"
            >
              <Save size={15} />
            </button>
            <button
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-indigo-500 transition"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
