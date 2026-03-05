'use client';

import { useEffect, useState } from 'react';
import { insforge } from '@/lib/insforge';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle2, Clock, XCircle, Search, Calendar, User, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface AppointmentData {
    id: string;
    status: 'scheduled' | 'confirmed' | 'cancelled';
    time_range: string;
    notes: string;
    patients: {
        first_name: string;
        last_name: string;
        phone: string;
    };
    services: {
        name: string;
        duration_minutes: number;
    };
}

export default function SolicitudesPage() {
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAppointments = async () => {
        setIsLoading(true);
        const { data, error } = await insforge.database
            .from('appointments')
            .select(`
                id,
                status,
                time_range,
                notes,
                patients(first_name, last_name, phone),
                services(name, duration_minutes)
            `)
            .order('created_at', { ascending: false });

        if (data && !error) {
            setAppointments(data as any);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        // Optimistic UI Update
        const previous = [...appointments];
        setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus as any } : app));

        try {
            const { error } = await insforge.database
                .from('appointments')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            if (newStatus === 'confirmed') toast.success('Cita confirmada exitosamente');
            if (newStatus === 'cancelled') toast.error('Cita cancelada/rechazada');
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Ocurrió un error al actualizar la cita');
            setAppointments(previous); // Revert
        }
    };

    const getStatusBadge = (status: string) => {
        if (status === 'confirmed') return <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 size={12} /> Confirmada</span>;
        if (status === 'cancelled') return <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1"><XCircle size={12} /> Cancelada</span>;
        return <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1"><Clock size={12} /> Pendiente</span>;
    };

    const parseDateRange = (range: string) => {
        const match = range.match(/\["?(.*?)"?,\s*"?(.*?)"?\)/);
        if (!match) return { date: '', time: '' };

        // Reemplazar espacio intermedio con 'T' para cumplimiento ISO (Safari/Firefox fix)
        const dateStr = match[1].replace(' ', 'T');
        const d = parseISO(dateStr);

        return {
            date: format(d, "dd 'de' MMMM", { locale: es }),
            time: format(d, 'HH:mm'),
        };
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold">Solicitudes de Turnos</h1>
                    <p className="text-slate-400 mt-1">Revisa y confirma las citas agendadas por los pacientes.</p>
                </div>
            </div>

            <div className="flex-1 min-h-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col p-6">

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-3">
                        <Calendar size={48} className="opacity-20" />
                        <p>No hay solicitudes de citas registradas aún.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 overflow-y-auto pr-2">
                        {appointments.map((app, i) => {
                            const { date, time } = parseDateRange(app.time_range);
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={app.id}
                                    className="bg-[#111111] border border-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                                        {/* Status & Date */}
                                        <div className="flex flex-col gap-2 min-w-[140px]">
                                            {getStatusBadge(app.status)}
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold capitalize">{date}</span>
                                                <span className="text-sm text-slate-400">{time} hs</span>
                                            </div>
                                        </div>

                                        {/* Patient Info */}
                                        <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                                            <div className="flex items-center gap-2 text-white font-medium">
                                                <User size={16} className="text-slate-500" />
                                                {app.patients?.first_name} {app.patients?.last_name}
                                            </div>
                                            <span className="text-sm text-slate-400 capitalize">{app.services?.name}</span>
                                            {app.notes && (
                                                <p className="text-xs text-slate-500 mt-1 italic pr-4">Nota: {app.notes}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {app.status === 'scheduled' && (
                                        <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                                            <button
                                                onClick={() => handleUpdateStatus(app.id, 'cancelled')}
                                                className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-500 transition-colors text-sm font-medium border border-white/10 hover:border-red-500/30"
                                            >
                                                Rechazar
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(app.id, 'confirmed')}
                                                className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors text-sm font-bold shadow-lg shadow-emerald-500/20"
                                            >
                                                Confirmar
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

