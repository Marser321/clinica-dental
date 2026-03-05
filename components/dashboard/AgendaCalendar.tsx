'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { format, addDays, startOfWeek, subWeeks, addWeeks, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { insforge } from '@/lib/insforge';

const TIME_SLOTS = Array.from({ length: 11 }, (_, i) => i + 9); // 09:00 to 19:00

export function AgendaCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Comienza en Lunes
    const days = Array.from({ length: 6 }, (_, i) => addDays(weekStart, i)); // Lunes a Sábado

    const handlePrevWeek = () => setCurrentDate(prev => subWeeks(prev, 1));
    const handleNextWeek = () => setCurrentDate(prev => addWeeks(prev, 1));
    const handleToday = () => setCurrentDate(new Date());

    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const { data, error } = await insforge.database
                .from('appointments')
                .select(`
                    id, 
                    time_range, 
                    status,
                    patients(first_name, last_name),
                    services(name, duration_minutes, color_code)
                `);

            if (data && !error) {
                const parsed = data.map((app: any) => {
                    const match = app.time_range.match(/\["?(.*?)"?,\s*"?(.*?)"?\)/);
                    if (!match) return null;
                    const startDate = new Date(match[1]);

                    return {
                        id: app.id,
                        title: app.services?.name || 'Cita Reservada',
                        patient: `${app.patients?.first_name} ${app.patients?.last_name}`,
                        date: startDate,
                        startHour: startDate.getHours() + (startDate.getMinutes() / 60),
                        durationMin: app.services?.duration_minutes || 60,
                        color: app.services?.color_code || 'bg-slate-500',
                    };
                }).filter(Boolean);

                setAppointments(parsed);
            }
        };

        fetchAppointments();
    }, [weekStart]);

    return (
        <div className="flex flex-col h-full bg-transparent">
            {/* Header del Calendario */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                        <button onClick={handlePrevWeek} className="p-2 hover:bg-white/10 rounded-md transition-colors text-slate-300">
                            <ChevronLeft size={18} />
                        </button>
                        <button onClick={handleToday} className="px-3 py-1.5 text-sm font-medium hover:bg-white/10 rounded-md transition-colors text-slate-300">
                            Hoy
                        </button>
                        <button onClick={handleNextWeek} className="p-2 hover:bg-white/10 rounded-md transition-colors text-slate-300">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                    <h2 className="text-xl font-display font-medium min-w-[200px] capitalize">
                        {format(weekStart, 'MMMM yyyy', { locale: es })}
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Sillón 1 - Dr. Principal
                    </div>
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all">
                        <CalendarIcon size={20} />
                    </button>
                </div>
            </div>

            {/* Grid del Calendario */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex-1 overflow-auto bg-black/40 relative"
            >
                <div className="min-w-[800px] flex">
                    {/* Columna de Horas */}
                    <div className="w-20 flex-shrink-0 border-r border-white/10 bg-black/20 z-10 sticky left-0">
                        <div className="h-14 border-b border-white/10"></div>
                        {TIME_SLOTS.map((hour) => (
                            <div key={hour} className="h-20 border-b border-white/5 flex items-start justify-center p-2 relative -top-3">
                                <span className="text-xs text-slate-500 font-medium bg-black/40 px-1 rounded">{`${hour.toString().padStart(2, '0')}:00`}</span>
                            </div>
                        ))}
                    </div>

                    {/* Contenedor de Días (Columnas) */}
                    <div className="flex-1 flex">
                        {days.map((day, dayIndex) => {
                            const isToday = isSameDay(day, new Date());
                            const dayAppointments = appointments.filter(a => isSameDay(a.date, day));

                            return (
                                <div key={dayIndex} className="flex-1 border-r border-white/10 relative">
                                    {/* Cabecera del Día */}
                                    <div className="flex flex-col h-14 border-b border-white/10 items-center justify-center bg-black/20 sticky top-0 z-10">
                                        <span className={`text-xs uppercase font-semibold ${isToday ? 'text-red-500' : 'text-slate-500'}`}>
                                            {format(day, 'EEE', { locale: es })}
                                        </span>
                                        <span className={`text-lg font-display ${isToday ? 'text-red-500 font-bold' : 'text-slate-300'}`}>
                                            {format(day, 'd')}
                                        </span>
                                    </div>

                                    {/* Celdas de Fondo (Horas) */}
                                    <div className="relative">
                                        {TIME_SLOTS.map((hour) => (
                                            <div key={`cell-${hour}`} className="h-20 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                                                <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white/40 text-2xl font-light">+</span>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Citas Superpuestas (Absolutas) */}
                                        {dayAppointments.map((app) => {
                                            const topOffset = (app.startHour - 9) * 80; // 80px por cada hora (h-20)
                                            const height = (app.durationMin / 60) * 80;

                                            return (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    key={app.id}
                                                    className={`absolute left-1 right-1 rounded-lg p-2 overflow-hidden shadow-lg border border-white/20 cursor-pointer hover:brightness-110 transition-all ${app.color}/20 backdrop-blur-md`}
                                                    style={{ top: `${topOffset}px`, height: `${height}px` }}
                                                >
                                                    <div className={`absolute top-0 left-0 bottom-0 w-1 ${app.color}`}></div>
                                                    <div className="pl-2">
                                                        <h4 className={`text-xs font-bold ${app.color.replace('bg-', 'text-')}`}>{app.title}</h4>
                                                        <p className="text-[10px] text-white/80 font-medium truncate mt-0.5">{app.patient}</p>
                                                        {app.durationMin >= 60 && (
                                                            <p className="text-[10px] text-white/50 mt-1">
                                                                {format(new Date().setHours(Math.floor(app.startHour), (app.startHour % 1) * 60), 'HH:mm')} -
                                                                {format(new Date().setHours(Math.floor(app.startHour + app.durationMin / 60), ((app.startHour + app.durationMin / 60) % 1) * 60), 'HH:mm')}
                                                            </p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
