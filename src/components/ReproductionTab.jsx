import React, { useState } from 'react';
import { Baby, Stethoscope, Syringe } from 'lucide-react';
import { GiCow } from 'react-icons/gi'; // <-- NUEVO: Icono de Vaca moderno y limpio
import { FaVenusMars } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

import PartosTab from './reproduction/PartosTab';
import TactosTab from './reproduction/TactosTab';
import ServiciosTab from './reproduction/ServiciosTab';

export default function ReproductionTab({ animal }) {
  const [activeSubTab, setActiveSubTab] = useState('partos');
  const animalId = animal?.id;

  const subTabs = [
    { id: 'partos', label: 'Partos', icon: GiCow }, // <-- CAMBIADO: Vaca representando a la madre
    { id: 'tactos', label: 'Palpación', icon: Stethoscope }, // Se mantiene igual
    { id: 'servicios', label: 'Servicios', icon: FaVenusMars }, // <-- CAMBIADO: Símbolos de cruce/reproducción
  ];

  return (
    <div>
      {/* Sub-Navegación Pills */}
      <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`relative flex flex-row items-center cursor-pointer justify-center gap-1.5 px-3.5 py-2 rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-colors whitespace-nowrap ${
                isActive
                  ? 'text-white'
                  : 'bg-white text-gray-500 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="reproductionSubTabActive"
                  className="absolute inset-0 bg-[#1B4820] rounded-full shadow-md -z-0"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <tab.icon size={16} strokeWidth={2.5} />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Vistas */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            {activeSubTab === 'partos' && <PartosTab animalId={animalId} />}
            {activeSubTab === 'tactos' && <TactosTab animal={animal} />}
            {activeSubTab === 'servicios' && <ServiciosTab animal={animal} />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
