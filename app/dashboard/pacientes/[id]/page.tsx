'use client';

import { useParams } from 'next/navigation';
import { Odontogram } from '@/components/dashboard/Odontogram';
import { ArrowLeft, Phone, Mail, Calendar, Activity, AlertCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useState } from 'react';
import { BookingModal } from '@/components/ui/BookingModal';

export default function FichaPacientePage() {
    const params = useParams();
    const id = params?.id as string;
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // TODO: Fetch desde InsForge usando el ID
    const patient = {
        name: 'Ana Gómez',
        document: '4.555.333-2',
        phone: '099 123 456',
        email: 'ana.gomez@email.com',
        birthdate: '15/04/1985 (41 años)',
        allergies: 'Penicilina',
        status: 'Active',
    };

    return (
        <div className="flex flex-col h-full gap-6 pb-20">
            {/* Header / Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
            >
                <Link href="/dashboard/pacientes" className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-display font-bold flex items-center gap-3">
                        {patient.name}
                        <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full">
                            Activa
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Ficha Clínica / CI: {patient.document}</p>
                </div>
                <div className="ml-auto flex gap-3">
                    <button onClick={() => toast.info('La edición de perfil se implementará en la próxima fase.')} className="btn-secondary">Editar Perfil</button>
                    <button onClick={() => setIsBookingOpen(true)} className="btn-primary">Nueva Cita</button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Columna Izquierda: Info Personal & Alertas */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col gap-6"
                >
                    {/* Tarjeta Alertas Médicas */}
                    <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                        <h3 className="text-red-400 font-semibold flex items-center gap-2 mb-3">
                            <AlertCircle size={18} />
                            Riesgo Médico / Alergias
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-sm font-medium">
                                {patient.allergies}
                            </span>
                        </div>
                    </div>

                    {/* Tarjeta Info de Contacto */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-semibold mb-4 text-slate-200">Datos Personales</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <Phone size={16} className="text-slate-500 mt-1" />
                                <div>
                                    <p className="text-sm text-white font-medium">{patient.phone}</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Móvil Principal</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail size={16} className="text-slate-500 mt-1" />
                                <div>
                                    <p className="text-sm text-white font-medium">{patient.email}</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Email</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar size={16} className="text-slate-500 mt-1" />
                                <div>
                                    <p className="text-sm text-white font-medium">{patient.birthdate}</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">F. Nacimiento</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Columna Central & Derecha: Odontograma e Historial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="xl:col-span-2 flex flex-col gap-6"
                >
                    {/* Odontograma */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 z-10">
                            <h3 className="font-display font-semibold text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-xl">
                                Odontograma Actual
                            </h3>
                        </div>
                        <Odontogram />
                    </div>

                    {/* Historial de Evoluciones (Timeline) */}
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-semibold mb-6 flex items-center gap-2">
                            <Activity size={18} className="text-red-500" />
                            Historial Clínico y Evoluciones
                        </h3>

                        <div className="relative pl-6 border-l border-white/10 ml-3 space-y-8">
                            {/* Evolution Item 1 */}
                            <div className="relative">
                                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#0f0f13] shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <h4 className="font-medium text-emerald-400">Restauración Pieza 21</h4>
                                    <span className="flex items-center gap-1 text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded-md w-fit">
                                        <Clock size={12} /> Hace 2 semanas
                                    </span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Se realizó resina compuesta fotocurable en pieza 21 por caries clase IV. Aislamiento absoluto. Pulido de alto brillo. Ausencia de dolor a la percusión post-operatoria.
                                </p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-xs bg-black/50 border border-white/10 text-slate-400 px-2.5 py-1 rounded-lg">Dr. Principal</span>
                                    <span className="text-xs bg-black/50 border border-white/10 text-slate-400 px-2.5 py-1 rounded-lg">Consentimiento Firmado ✔</span>
                                </div>
                            </div>

                            {/* Evolution Item 2 */}
                            <div className="relative">
                                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-red-500 border-4 border-[#0f0f13] shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <h4 className="font-medium text-red-400">Diagnóstico Inicial Triage</h4>
                                    <span className="flex items-center gap-1 text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded-md w-fit">
                                        <Clock size={12} /> 12 Nov, 2026
                                    </span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Paciente acude por dolor agudo en cuadrante superior derecho al frío. Se indica radiografía periapical. Diagnóstico presuntivo: Pulpitis irreversible en pieza 16.
                                </p>
                                <div className="mt-3 flex items-center gap-2 text-xs">
                                    <button onClick={() => toast.warning('Visor DICOM en mantenimiento.')} className="text-red-500 hover:text-white transition-colors flex items-center gap-1">
                                        Ver Radiografía Adjunta 📎
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </div>
    );
}
