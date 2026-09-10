import React, { useState } from 'react';
import { X, MapPin, Building2, Plus, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { createFarm } from '@/lib/farmUtils';

export default function FarmModal({ isOpen, onClose, onFarmCreated }) {
  const [activeView, setActiveView] = useState('list'); // 'list' | 'create'
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const farms = useLiveQuery(() => db.farms.filter(f => !f.deleted_at).toArray()) || [];
  const animals = useLiveQuery(() => db.animals.filter(a => !a.deleted_at).toArray()) || [];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('El nombre de la finca es obligatorio');
      return;
    }
    setIsSaving(true);
    setError('');
    try {
      const newFarm = await createFarm({ name: name.trim(), location: location.trim(), description: description.trim() });
      setName('');
      setLocation('');
      setDescription('');
      setSuccessMsg('¡Finca creada con éxito!');
      setTimeout(() => setSuccessMsg(''), 2500);
      if (onFarmCreated) onFarmCreated(newFarm);
      setActiveView('list');
    } catch (err) {
      setError(err.message || 'Error al guardar la finca');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1B4820]/10 flex items-center justify-center text-[#1B4820]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Gestión de Fincas</h3>
              <p className="text-xs text-neutral-500">Predios y haciendas ganaderas</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400 hover:text-neutral-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Vista */}
        <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-2xl">
          <button
            type="button"
            onClick={() => { setActiveView('list'); setError(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'list'
                ? 'bg-white text-[#1B4820] shadow-xs'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Fincas Registradas ({farms.length})
          </button>
          <button
            type="button"
            onClick={() => { setActiveView('create'); setError(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeView === 'create'
                ? 'bg-[#1B4820] text-white shadow-xs'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Nueva Finca
          </button>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-xl">
            {error}
          </div>
        )}

        {activeView === 'list' ? (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {farms.length === 0 ? (
              <div className="text-center py-8 text-neutral-400">
                <Building2 className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-xs font-bold uppercase tracking-wider">No hay fincas registradas aún</p>
                <button
                  type="button"
                  onClick={() => setActiveView('create')}
                  className="mt-3 text-xs font-bold text-[#1B4820] underline cursor-pointer"
                >
                  Registrar la primera finca
                </button>
              </div>
            ) : (
              farms.map((f) => {
                const farmAnimalsCount = animals.filter(a => a.farm_id === f.id).length;
                return (
                  <div
                    key={f.id}
                    className="p-3.5 bg-neutral-50 hover:bg-neutral-100 rounded-2xl border border-neutral-200/70 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-neutral-200 text-[#1B4820] shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900">{f.name}</h4>
                        {f.location && (
                          <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                            <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                            <span>{f.location}</span>
                          </div>
                        )}
                        {f.description && (
                          <p className="text-[10px] text-neutral-400 truncate max-w-[220px]">{f.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60">
                        <Users className="w-3 h-3 text-emerald-600" />
                        {farmAnimalsCount} animales
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1 block">
                Nombre de la Finca *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Hacienda El Mirador"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1B4820]/20"
                autoFocus
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1 block">
                Ubicación / Sector
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej. Calabozo, Guárico"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1B4820]/20"
                />
                <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1 block">
                Descripción / Notas
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Notas sobre potreros, capacidad o características..."
                rows={2}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1B4820]/20 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveView('list')}
                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Volver a la lista
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-[#1B4820] hover:bg-emerald-950 text-white text-xs font-bold py-3.5 rounded-xl disabled:opacity-50 transition-all shadow-sm cursor-pointer"
              >
                {isSaving ? 'Guardando...' : 'Guardar Finca'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
