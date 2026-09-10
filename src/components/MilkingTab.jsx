import React, { useState, useMemo } from 'react';
import { Milk, Plus, Calendar, Clock, Droplet, TrendingUp } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { formatDateLocal } from '@/lib/dateUtils';
import MilkingModal from '@/components/inventario/MilkingModal';

export default function MilkingTab({ animal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Consulta reactiva a registros de ordeño de esta vaca
  const records = useLiveQuery(
    () => {
      if (!animal?.id) return [];
      return db.milking_records
        .where('animal_id')
        .equals(animal.id)
        .and(r => !r.deleted_at)
        .reverse()
        .sortBy('milking_date');
    },
    [animal?.id]
  ) || [];

  // Cálculos estadísticos
  const stats = useMemo(() => {
    if (records.length === 0) {
      return { total: 0, average: 0, daysCount: 0, today: 0 };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const total = records.reduce((acc, r) => acc + (Number(r.liters) || 0), 0);

    const byDate = {};
    for (const r of records) {
      byDate[r.milking_date] = (byDate[r.milking_date] || 0) + (Number(r.liters) || 0);
    }

    const daysCount = Object.keys(byDate).length;
    const average = daysCount > 0 ? total / daysCount : 0;
    const today = byDate[todayStr] || 0;

    return {
      total: Number(total.toFixed(1)),
      average: Number(average.toFixed(1)),
      daysCount,
      today: Number(today.toFixed(1))
    };
  }, [records]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* TARJETAS RESUMEN DE PRODUCCIÓN */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-neutral-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total Histórico</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-[#1B4820]">{stats.total}</span>
            <span className="text-xs font-bold text-neutral-500">Lts</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-xs border border-neutral-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Promedio Diario</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-blue-600">{stats.average}</span>
            <span className="text-xs font-bold text-neutral-500">L/día</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-xs border border-neutral-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Hoy</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-600">{stats.today}</span>
            <span className="text-xs font-bold text-neutral-500">Lts</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-xs border border-neutral-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Días Ordeño</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-neutral-800">{stats.daysCount}</span>
            <span className="text-xs font-bold text-neutral-500">días</span>
          </div>
        </div>
      </div>

      {/* BOTÓN DE ACCIÓN */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-100 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-neutral-900">Control de Leche</h3>
          <p className="text-xs text-neutral-500">Registra las pesadas de cada turno</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#1B4820] hover:bg-[#133517] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Ordeño</span>
        </button>
      </div>

      {/* LISTADO DE ORDEÑOS */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-neutral-100 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
          <Milk className="w-5 h-5 text-blue-600" />
          <h4 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
            Historial de Ordeños ({records.length})
          </h4>
        </div>

        {records.length === 0 ? (
          <div className="py-12 text-center text-neutral-400 space-y-2">
            <Droplet className="w-10 h-10 mx-auto opacity-30 text-blue-500" />
            <p className="text-xs font-bold uppercase tracking-wider">No hay registros de ordeño</p>
            <p className="text-xs text-neutral-400">Comienza registrando la producción lechera de esta vaca.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {records.map((r) => (
              <div key={r.id} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Milk className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-800">
                        {formatDateLocal(r.milking_date)}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                        {r.shift}
                      </span>
                    </div>
                    {r.observations && (
                      <p className="text-[11px] text-neutral-500 mt-0.5">{r.observations}</p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-blue-700">
                    {r.liters} L
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DE ORDEÑO */}
      <MilkingModal
        isOpen={isModalOpen}
        animal={animal}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
