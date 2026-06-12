import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-indigo-500 text-white p-2 rounded-xl shadow-lg">
        <CheckSquare size={28} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
        <p className="text-slate-500 text-sm">Stay organized, get things done</p>
      </div>
    </div>
  );
}
