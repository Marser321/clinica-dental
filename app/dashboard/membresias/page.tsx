'use client';

import { useState } from 'react';
import { CreditCard, CheckCircle2, Star, TrendingUp, Users, Plus, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

// Planes de Membresía Predeterminados (Mock)
const MOCK_PLANS = [
    {
        id: 'basic',
        name: 'Smile Básico',
        price: 990,
        accent: 'bg-slate-500',
        border: 'border-slate-500/20',
        text: 'text-slate-400',
        features: ['1 Limpieza Anual Gratis', '10% Dto. en Tratamientos', 'Radiografías Base Incluidas']
    },
    {
        id: 'pro',
        name: 'Smile PRO',
        price: 1890,
        accent: 'bg-red-500',
        border: 'border-red-500/30',
        text: 'text-red-400',
        isPopular: true,
        features: ['2 Limpiezas Anuales Gratis', '20% Dto. en Tratamientos', 'Blanqueamiento Anual 50% Dto', 'Triage Prioritario']
    },
    {
        id: 'elite',
        name: 'Smile Élite',
        price: 2990,
        accent: 'bg-amber-500',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        features: ['Limpiezas Ilimitadas', '30% Dto. Tratamientos/Implantes', 'Blanqueamiento Premium Anual', 'Estética Dental Prioritaria']
    }
];

// Pacientes Suscritos (Mock)
const SUBSCRIBERS = [
    { id: 1, name: 'Ana Gómez', plan: 'Smile PRO', status: 'active', renewal: '15 Nov 2026', lifetimeValue: '$18.900' },
    { id: 2, name: 'Luis Terra', plan: 'Smile Élite', status: 'active', renewal: '02 Ene 2027', lifetimeValue: '$45.000' },
    { id: 3, name: 'Marta Ríos', plan: 'Smile Básico', status: 'past_due', renewal: 'Atrasado (3 días)', lifetimeValue: '$4.950' },
];

export default function MembresiasPage() {
    return (
        <div className="flex flex-col h-full gap-8 pb-10">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-display font-bold flex items-center gap-3">
                        Gestión de Membresías
                        <span className="bg-red-500/10 text-red-500 text-xs px-2.5 py-1 rounded-full border border-red-500/20">Ingresos Recurrentes</span>
                    </h1>
                    <p className="text-slate-400 mt-1">Configura los planes del &quot;Smile Club&quot; y visualiza las suscripciones activas.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={18} />
                    <span>Crear Nuevo Plan</span>
                </motion.button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/40 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={48} className="text-emerald-500" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Ingreso Mensual Recurrente</p>
                    <h3 className="text-3xl font-display font-bold text-white">$45.800</h3>
                    <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">+12% vs mes anterior</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black/40 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users size={48} className="text-blue-500" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Pacientes Suscritos</p>
                    <h3 className="text-3xl font-display font-bold text-white">42</h3>
                    <p className="text-xs text-blue-400 mt-2 flex items-center gap-1">5 en periodo de gracia</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-red-600/20 to-black border border-red-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Star size={48} className="text-red-500" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Plan más popular</p>
                    <h3 className="text-3xl font-display font-bold text-red-400">Smile PRO</h3>
                    <p className="text-xs text-slate-300 mt-2">Representa el 60% de los afiliados.</p>
                </motion.div>
            </div>

            {/* Planes Disponibles */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <ShieldCheck className="text-red-500" />
                    Planes Activos en tu Clínica
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MOCK_PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            whileHover={{ y: -5 }}
                            className={`relative bg-black/50 rounded-3xl border ${plan.border} p-8 shadow-2xl backdrop-blur-sm flex flex-col`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                                    Más Elegido
                                </div>
                            )}
                            <h3 className={`text-xl font-display font-bold ${plan.text} mb-2`}>{plan.name}</h3>
                            <div className="flex items-end gap-1 mb-6">
                                <span className="text-4xl font-display font-bold text-white">${plan.price}</span>
                                <span className="text-slate-500 mb-1">/mes</span>
                            </div>

                            <ul className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className={`${plan.text} shrink-0 mt-0.5`} />
                                        <span className="text-sm text-slate-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full py-3 rounded-xl text-sm font-bold transition-transform ${plan.isPopular ? 'bg-red-500 text-white' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                            >
                                Editar Plan
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Tabla de Suscriptores */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-6">Últimas Suscripciones (Activity)</h2>
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/60 border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Afiliado</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Plan Contratado</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Próxima Renovación</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">LTV (Valor Historico)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {SUBSCRIBERS.map((sub) => (
                                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{sub.name}</td>
                                    <td className="px-6 py-4 text-sm text-slate-300">{sub.plan}</td>
                                    <td className="px-6 py-4">
                                        {sub.status === 'active'
                                            ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg font-medium"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>Al día</span>
                                            : <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg font-medium"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Atrasado</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">{sub.renewal}</td>
                                    <td className="px-6 py-4 text-sm text-slate-300 text-right font-mono">{sub.lifetimeValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
