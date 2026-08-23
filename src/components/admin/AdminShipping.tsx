import React, { useState } from 'react';
import { Truck, Search, Check, Edit2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminShipping: React.FC = () => {
  const { shippingStates, updateShippingState } = useStore();
  const [search, setSearch] = useState('');
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editFee, setEditFee] = useState<number>(0);
  const [editDays, setEditDays] = useState<string>('');
  const [savedCode, setSavedCode] = useState<string | null>(null);

  const startEdit = (code: string, currentFee: number, currentDays: string) => {
    setEditingCode(code);
    setEditFee(currentFee);
    setEditDays(currentDays);
  };

  const saveEdit = (code: string) => {
    updateShippingState(code, editFee, editDays);
    setEditingCode(null);
    setSavedCode(code);
    setTimeout(() => setSavedCode(null), 2000);
  };

  const filteredStates = shippingStates.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-black text-white">NIGERIAN LOGISTICS & SHIPPING RATES</h2>
          <p className="text-xs text-zinc-400">Configure delivery fees (₦) and estimated transit windows per state.</p>
        </div>

        <div className="relative max-w-xs">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search state (e.g. Lagos, Abuja, Rivers)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-onyx-surface border border-white/8 text-white placeholder-zinc-500 text-xs focus:border-brand-purple transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-onyx-surface/80 border border-white/8 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/50 border-b border-white/8 text-zinc-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-bold">State Name</th>
                <th className="py-3.5 px-4 font-bold">Code</th>
                <th className="py-3.5 px-4 font-bold">Delivery Fee (₦)</th>
                <th className="py-3.5 px-4 font-bold">Estimated Delivery Window</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {filteredStates.map((st) => {
                const isEditing = editingCode === st.code;

                return (
                  <tr key={st.code} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <Truck className="w-4 h-4 text-brand-purple-light shrink-0" />
                      <span>{st.name}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-zinc-400 font-bold">
                      {st.code}
                    </td>

                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editFee}
                          onChange={(e) => setEditFee(Number(e.target.value))}
                          className="px-2.5 py-1 rounded bg-black border border-brand-purple text-white text-xs font-price font-bold w-28"
                        />
                      ) : (
                        <span className="font-price font-bold text-white text-sm">
                          ₦{st.fee.toLocaleString()}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-400">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editDays}
                          onChange={(e) => setEditDays(e.target.value)}
                          className="px-2.5 py-1 rounded bg-black border border-brand-purple text-white text-xs w-44"
                        />
                      ) : (
                        <span>{st.deliveryDays}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {isEditing ? (
                        <button
                          onClick={() => saveEdit(st.code)}
                          className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(st.code, st.fee, st.deliveryDays)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center ml-auto transition-colors cursor-pointer"
                          title="Edit Shipping Rate"
                        >
                          {savedCode === st.code ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Edit2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
