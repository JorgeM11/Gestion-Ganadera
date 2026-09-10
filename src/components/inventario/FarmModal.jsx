import React, { useState } from 'react';
import { X, MapPin, Building2 } from 'lucide-react';
import { createFarm } from '@/lib/farmUtils';

export default function FarmModal({ isOpen, onClose, onFarmCreated }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

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
      const newFarm = await createFarm({ name, location, description });
      setName('');
      setLocation('');
      setDescription('');
      if (onFarmCreated) onFarmCreated(newFarm);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar la finca');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1B4820]/10 flex items-center justify-center text-[#1B4820]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Nueva Finca</h3>
              <p className="text-xs text-neutral-500">Registrar predio o hacienda ganadera</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400 hover:text-neutral-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-xl">
            {error}
          </div>
        )}

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
              onClick={onClose}
              className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-[#1B4820] hover:bg-[#143718] text-white text-xs font-bold py-3.5 rounded-xl disabled:opacity-50 transition-all shadow-sm cursor-pointer"
            >
              {isSaving ? 'Guardando...' : 'Guardar Finca'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
