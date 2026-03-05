'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

// Cuadrantes dentales estándar (Adulto) simplificados para demo 
// 1 = Superior Derecho, 2 = Superior Izquierdo, 3 = Inferior Izq, 4 = Inferior Der
const UPPER_TEETH = Array.from({ length: 16 }, (_, i) => i < 8 ? 18 - i : 21 + (i - 8));
const LOWER_TEETH = Array.from({ length: 16 }, (_, i) => i < 8 ? 48 - i : 31 + (i - 8));

type ToothCondition = 'healthy' | 'decay' | 'filled' | 'missing' | 'crown';

const CONDITION_COLORS: Record<ToothCondition, string> = {
    healthy: 'bg-slate-200 border-slate-300',
    decay: 'bg-red-500 border-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
    filled: 'bg-emerald-400 border-emerald-500',
    missing: 'bg-transparent border-dashed border-slate-600',
    crown: 'bg-amber-400 border-amber-500',
};

export function Odontogram() {
    const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
    const [conditions, setConditions] = useState<Record<number, ToothCondition>>({
        16: 'decay',
        21: 'filled',
        38: 'missing',
        46: 'crown'
    });

    const handleToothClick = (tooth: number) => {
        setSelectedTooth(tooth);
        // Simulamos un ciclo rápido de estados al hacer click (para demo)
        const current = conditions[tooth] || 'healthy';
        const order: ToothCondition[] = ['healthy', 'decay', 'filled', 'crown', 'missing'];
        const next = order[(order.indexOf(current) + 1) % order.length];
        setConditions(prev => ({ ...prev, [tooth]: next }));
    };

    const renderToothRow = (teeth: number[]) => (
        <div className="flex justify-center gap-1 sm:gap-2 w-full">
            {teeth.map((tooth, index) => {
                // Separador intermedio (línea media)
                const isMidline = index === 7;
                const status = conditions[tooth] || 'healthy';

                return (
                    <div key={tooth} className={`flex items-center gap-1 sm:gap-2 ${isMidline ? 'mr-4 sm:mr-8 relative' : ''}`}>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] text-slate-500 font-mono font-medium">{tooth}</span>
                            <button
                                onClick={() => handleToothClick(tooth)}
                                className={`w-6 h-8 sm:w-8 sm:h-12 rounded-[4px] border-2 transition-all duration-300 relative group
                                    ${CONDITION_COLORS[status]}
                                    ${selectedTooth === tooth ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-[#0f0f13] scale-110 z-10' : 'hover:scale-105'}
                                `}
                            >
                                {/* Indicador visual de raíz (solo estética) */}
                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black/20 rounded-t-full"></div>
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1h-1.5 bg-black/20 rounded-b-full"></div>
                            </button>
                        </div>
                        {isMidline && (
                            <div className="absolute right-[-10px] sm:right-[-20px] top-0 bottom-0 w-px bg-white/10 hidden sm:block"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-8 shadow-inner overflow-x-auto">
            {renderToothRow(UPPER_TEETH)}
            <div className="w-full h-px bg-white/5 max-w-2xl my-2 relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f0f13] px-4 text-xs font-medium text-slate-600 uppercase tracking-widest">
                    Plano Oclusal
                </span>
            </div>
            {renderToothRow(LOWER_TEETH)}

            {/* Leyenda Rápida */}
            <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 border-t border-white/5 pt-6 w-full max-w-2xl">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-slate-200"></div><span className="text-xs text-slate-400">Sano</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div><span className="text-xs text-red-400 font-medium">Caries</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-emerald-400"></div><span className="text-xs text-emerald-400">Obturación</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-amber-400"></div><span className="text-xs text-amber-400">Corona</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-transparent border-2 border-dashed border-slate-600"></div><span className="text-xs text-slate-500">Ausente</span></div>
            </div>
        </div>
    );
}
