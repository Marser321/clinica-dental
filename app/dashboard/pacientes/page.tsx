'use client';

import { useState } from 'react';
import { Search, Plus, User, Phone, Mail, FileText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

const MOCK_PATIENTS = [
    { id: '1', name: 'Ana Gómez', document: '4.555.333-2', phone: '099 123 456', lastVisit: '12 Nov 2026', status: 'active' },
    { id: '2', name: 'Carlos Ruiz', document: '3.111.222-1', phone: '091 987 654', lastVisit: '05 Ene 2027', status: 'active' },
    { id: '3', name: 'Lucía Silva', document: '5.666.888-9', phone: '098 555 333', lastVisit: 'Hace 2 días', status: 'active' },
    { id: '4', name: 'Martín Pérez', document: '2.444.111-0', phone: '092 111 222', lastVisit: '20 Oct 2026', status: 'inactive' },
];

export default function PacientesPage() {
    const [search, setSearch] = useState('');

    return (
        <div className="flex flex-col h-full gap-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-display font-bold">Pacientes</h1>
                    <p className="text-slate-400 mt-1">Directorio y clínica digital integrada.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={18} />
                    <span>Nuevo Paciente</span>
                </motion.button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-sm min-h-0 flex-1 flex flex-col"
            >
                {/* Header Actions */}
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, CI o teléfono..."
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/40 border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Paciente</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Documento</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Contacto</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Última Visita</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {MOCK_PATIENTS.map((p, i) => (
                                <motion.tr
                                    key={p.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.15 + (i * 0.05) }}
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-black flex items-center justify-center border border-white/10">
                                                <User size={18} className="text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{p.name}</p>
                                                <p className="text-xs text-emerald-500">Activo</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-300 font-mono">{p.document}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-2 text-sm text-slate-300"><Phone size={14} className="text-slate-500" /> {p.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-400">{p.lastVisit}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/dashboard/pacientes/${p.id}`} className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors">
                                            Ver Ficha
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
