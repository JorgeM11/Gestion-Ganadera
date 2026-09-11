import React, { useState } from 'react';
import { Stethoscope, Calendar, HeartHandshake, Baby } from 'lucide-react';
import { GiCow } from 'react-icons/gi';
import { FaVenusMars } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { formatShortDateLocal } from '@/lib/dateUtils';

import PartosTab from './reproduction/PartosTab';
import TactosTab from './reproduction/TactosTab';
import ServiciosTab from './reproduction/ServiciosTab';

export default function ReproductionTab({ animal }) {
  const [activeSubTab, setActiveSubTab] = useState('partos');
  const animalId = animal?.id;

  // Conteo reactivo de crías nacidas
  const offspringCount = useLiveQuery(
    () => db.animals
      .where('mother_id').equals(animalId)
      .and(a => !a.deleted_at)
      .count(),
    [animalId]
  ) ?? 0;

  // Consulta reactiva de palpaciones y diagnóstico más reciente
  const checks = useLiveQuery(
    () => db.pregnancy_checks
      .where('animal_id').equals(animalId)
      .and(c => !c.deleted_at)
      .toArray()
      .then(res => res.sort((a, b) => b.check_date.localeCompare(a.check_date))),
    [animalId]
  ) || [];

  // Consulta reactiva de servicios
  const services = useLiveQuery(
    () => db.services
      .where('mother_id').equals(animalId)
      .and(s => !s.deleted_at)
      .toArray()
      .then(res => res.sort((a, b) => b.service_date.localeCompare(a.service_date))),
    [animalId]
  ) || [];

  const lastCheck = checks[0] || null;
  const lastService = services[0] || null;

  const subTabs = [
    { id: 'partos', label: 'Partos', count: offspringCount, icon: GiCow },
    { id: 'tactos', label: 'Palpación', count: checks.length, icon: Stethoscope },
    { id: 'servicios', label: 'Servicios', count: services.length, icon: FaVenusMars },
  ];

  if (!animal) return null;

  return (
    <div className="max-w-3xl mx-auto py-2 pb-24 relative">
      
      {/* 1. TÍTULO DE SECCIÓN Y ACCIONES */}
      <div className="mb-6 px-1 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#EEF7EE] text-[#1B4820] rounded-2xl border border-[#1B4820]/10 shadow-2xs">
            <FaVenusMars className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B4820] leading-tight">Registro Reproductivo</h2>
            <p className="text-xs text-neutral-400 font-medium">Control de partos, palpaciones y servicios</p>
          </div>
        </div>
        <div className="bg-[#EEF7EE] px-3.5 py-1.5 rounded-2xl text-[#1B4820] font-black text-base border border-[#1B4820]/10 shadow-2xs">
          #{animal.number}
        </div>
      </div>

      {/* 2. PANEL DE MÉTRICAS REPRODUCTIVAS EJECUTIVAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {/* Partos Registrados */}
        <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B4820] flex items-center justify-center shrink-0 border border-emerald-100">
            <GiCow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Crías / Partos</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-neutral-900">{offspringCount}</span>
              <span className="text-xs font-semibold text-neutral-400">partos</span>
            </div>
          </div>
        </div>

        {/* Diagnóstico Reproductivo Actual */}
        <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
            lastCheck?.result === 'Preñada' 
              ? 'bg-emerald-50 text-[#1B4820] border-emerald-100' 
              : lastCheck?.result === 'Vacía'
                ? 'bg-rose-50 text-[#D15555] border-rose-100'
                : 'bg-neutral-50 text-neutral-500 border-neutral-100'
          }`}>
            <Stethoscope className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Diagnóstico Actual</span>
            {lastCheck ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-sm font-black truncate block ${
                  lastCheck.result === 'Preñada' ? 'text-[#1B4820]' : 'text-[#D15555]'
                }`}>
                  {lastCheck.result}
                </span>
                <span className="text-[10px] font-bold text-neutral-400">
                  ({formatShortDateLocal(lastCheck.check_date)})
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-neutral-400 italic">Sin palpaciones</span>
            )}
          </div>
        </div>

        {/* Último Servicio */}
        <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#8C6746] flex items-center justify-center shrink-0 border border-amber-100">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Último Servicio</span>
            {lastService ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-black text-neutral-900 truncate block">
                  {lastService.type_conception === 'IA' ? 'Inseminación' : 'Monta'}
                </span>
                <span className="text-[10px] font-bold text-neutral-400">
                  ({formatShortDateLocal(lastService.service_date)})
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-neutral-400 italic">Sin servicios</span>
            )}
          </div>
        </div>
      </div>

      {/* 3. SUB-NAVEGACIÓN PILLS */}
      <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`relative flex items-center cursor-pointer justify-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap select-none active:scale-95 ${
                isActive
                  ? 'text-white'
                  : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="reproductionSubTabActive"
                  className="absolute inset-0 bg-[#1B4820] rounded-full shadow-md shadow-[#1B4820]/20 -z-0"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {tab.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. VISTAS DINÁMICAS */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            {activeSubTab === 'partos' && <PartosTab animalId={animalId} animal={animal} />}
            {activeSubTab === 'tactos' && <TactosTab animal={animal} />}
            {activeSubTab === 'servicios' && <ServiciosTab animal={animal} />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
