import React, { useState } from 'react';
import { X, Milk, Calendar, Clock } from 'lucide-react';
import { createMilkingRecord } from '@/lib/milkingUtils';
import CustomSelect from '@/components/ui/CustomSelect';
import { DateInput } from '@/components/ui/DateInput';

export default function MilkingModal({ isOpen, onClose, animal, onRecordCreated }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [shift, setShift] = useState('Mañana');
  const [liters, setLiters] = useState('');
  const [observations, setObservations] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !animal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = Number(liters);
    if (!liters || isNaN(parsed) || parsed <= 0) {
      setError('Ingresa una cantidad válida de litros mayor a 0');
      return;
    }

    setIsSaving(true);
    setError('');
    try {
      const record = await createMilkingRecord({
        animal_id: animal.id,
        farm_id: animal.farm_id || null,
        milking_date: date,
        shift,
        liters: parsed,
        observations
      });
      setLiters('');
      setObservations('');
      if (onRecordCreated) onRecordCreated(record);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar el registro de ordeño');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Milk className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Registro de Ordeño</h3>
              <p className="text-xs text-neutral-500">Vaca: #{animal.number} {animal.breed ? `(${animal.breed})` : ''}</p>
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
              Fecha de Ordeño *
            </label>
            <DateInput
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1B4820]/20"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1 block">
              Turno *
            </label>
            <CustomSelect
              value={shift}
              onChange={setShift}
              options={[
                { value: 'Mañana', label: '🌅 Turno Mañana' },
                { value: 'Tarde', label: '🌇 Turno Tarde' },
                { value: 'Único', label: '🥛 Turno Único / Día Completo' }
              ]}
              bgClass="bg-neutral-50"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1 block">
              Litros Producidos *
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={liters}
                onChange={(e) => setLiters(e.target.value)}
                placeholder="Ej. 14.5"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#1B4820]/20"
                autoFocus
              />
              <span className="absolute right-4 top-3 text-xs font-bold text-neutral-400">Litros</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1 block">
              Observaciones
            </label>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Ej. Buena bajada de leche, suplemento concentrado..."
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
              {isSaving ? 'Registrando...' : 'Registrar Ordeño'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
