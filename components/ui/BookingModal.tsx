'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, ChevronRight, CheckCircle2, User, Phone, Loader2 } from 'lucide-react';
import { insforge } from '@/lib/insforge';
import { format, parseISO, setHours, setMinutes, addMinutes } from 'date-fns';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState({
        specialty: '',
        date: '',
        time: '',
        name: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Reset when closed
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(1);
                setSelection({ specialty: '', date: '', time: '', name: '', phone: '' });
            }, 300);
        }
    }, [isOpen]);

    // Prevenir scroll del body
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const specialties = [
        'Odontología General', 'Ortodoncia', 'Implantes', 'Estética (Carillas/Blanqueamiento)', 'Endodoncia', 'Urgencia'
    ];

    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            // Saltear domingos
            if (date.getDay() !== 0) {
                dates.push({
                    day: date.toLocaleDateString('es-UY', { weekday: 'short' }),
                    num: date.getDate(),
                    full: date.toISOString()
                });
            }
        }
        return dates.slice(0, 4); // Mostrar 4 días
    };

    const nextStep = () => setStep(prev => prev + 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const [hourStr, minStr] = selection.time.split(':');
            const baseDate = parseISO(selection.date);
            const startDate = setMinutes(setHours(baseDate, parseInt(hourStr)), parseInt(minStr));
            const endDate = addMinutes(startDate, 60);

            // PostgreSQL tsrange format
            const timeRange = `[${format(startDate, "yyyy-MM-dd HH:mm:ss")}, ${format(endDate, "yyyy-MM-dd HH:mm:ss")})`;

            const [firstName, ...lastNames] = selection.name.split(' ');
            const lastName = lastNames.join(' ') || '-';

            // 1. Crear el paciente (anónimo)
            const { data: patient, error: patientError } = await insforge.database
                .from('patients')
                .insert({
                    first_name: firstName,
                    last_name: lastName,
                    phone: selection.phone,
                })
                .select()
                .single();

            if (patient && !patientError) {
                // 2. Crear la cita
                await insforge.database.from('appointments').insert({
                    patient_id: patient.id,
                    doctor_id: '11111111-1111-1111-1111-111111111111',
                    service_id: '44444444-4444-4444-4444-444444444444', // Limpieza Dental (mock ID for demo)
                    time_range: timeRange,
                    status: 'scheduled',
                    notes: `Especialidad requerida: ${selection.specialty}`
                });
            }

            setStep(4); // Pantalla de éxito
        } catch (error) {
            console.error('Error al agendar cita:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-lg bg-[#111111] border border-white/5 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-full"
                        >
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#111111] relative z-10 shrink-0">
                                <div>
                                    <h3 className="font-display font-bold text-lg text-white">
                                        Agendar Consulta
                                    </h3>
                                    {step < 4 && (
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            Paso {step} de 3
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            {step < 4 && (
                                <div className="h-1 w-full bg-white/5 relative shrink-0">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-accent"
                                        initial={false}
                                        animate={{ width: `${(step / 3) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            )}

                            {/* Content Body (Scrollable) */}
                            <div className="p-6 overflow-y-auto">
                                <AnimatePresence mode="wait">
                                    {/* PASO 1: Especialidad */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex flex-col gap-3"
                                        >
                                            <h4 className="font-semibold text-white mb-2">¿En qué podemos ayudarte?</h4>
                                            {specialties.map((spec) => (
                                                <button
                                                    key={spec}
                                                    onClick={() => {
                                                        setSelection(prev => ({ ...prev, specialty: spec }));
                                                        nextStep();
                                                    }}
                                                    className={`text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between group
                                                        ${selection.specialty === spec
                                                            ? 'border-red-500 bg-red-950/40 shadow-sm'
                                                            : 'border-white/10 hover:border-red-500/50 hover:bg-red-950/20 bg-[#1A1A1A]'
                                                        }
                                                    `}
                                                >
                                                    <span className={`font-medium ${selection.specialty === spec ? 'text-red-500' : 'text-slate-300 group-hover:text-red-400'}`}>
                                                        {spec}
                                                    </span>
                                                    <ChevronRight size={18} className={`${selection.specialty === spec ? 'text-red-500' : 'text-slate-500 group-hover:text-red-500'}`} />
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}

                                    {/* PASO 2: Fecha y Hora */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            {/* Selector de Fecha */}
                                            <div className="mb-6">
                                                <div className="flex items-center gap-2 text-white font-semibold mb-3">
                                                    <CalendarIcon size={18} className="text-red-500" />
                                                    <h4>Seleccioná un día</h4>
                                                </div>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {generateDates().map((d) => (
                                                        <button
                                                            key={d.full}
                                                            onClick={() => setSelection(prev => ({ ...prev, date: d.full }))}
                                                            className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all ${selection.date === d.full
                                                                ? 'bg-red-500 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                                                                : 'bg-[#1A1A1A] border-white/10 text-slate-300 hover:border-red-500 hover:bg-red-950/20'
                                                                }`}
                                                        >
                                                            <span className="text-xs uppercase font-semibold opacity-80">{d.day}</span>
                                                            <span className="text-xl font-bold">{d.num}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Selector de Hora */}
                                            {selection.date && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mb-6"
                                                >
                                                    <div className="flex items-center gap-2 text-white font-semibold mb-3">
                                                        <Clock size={18} className="text-red-500" />
                                                        <h4>Horarios disponibles</h4>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {['09:00', '10:30', '14:00', '15:30', '17:00', '18:00'].map((time) => (
                                                            <button
                                                                key={time}
                                                                onClick={() => setSelection(prev => ({ ...prev, time }))}
                                                                className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${selection.time === time
                                                                    ? 'bg-red-500 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                                                                    : 'bg-[#1A1A1A] border-white/10 text-slate-300 hover:border-red-500 hover:bg-red-950/20'
                                                                    }`}
                                                            >
                                                                {time}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Actions */}
                                            <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(1)}
                                                    className="text-slate-400 font-medium text-sm hover:text-white"
                                                    disabled={isLoading}
                                                >
                                                    Volver
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={!selection.date || !selection.time || isLoading}
                                                    onClick={nextStep}
                                                    className="btn-primary py-2.5 px-6 disabled:opacity-50 disabled:pointer-events-none"
                                                >
                                                    Continuar
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* PASO 3: Datos de Contacto */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <div className="bg-red-950/30 rounded-xl p-4 mb-6 border border-red-900/30 flex flex-col gap-1">
                                                <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">Resumen</span>
                                                <p className="text-sm font-medium text-white">{selection.specialty}</p>
                                                <p className="text-sm text-slate-300">Turno: {selection.time} hs</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-1">Nombre Completo</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <User size={18} className="text-slate-500" />
                                                        </div>
                                                        <input
                                                            required
                                                            type="text"
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-sans"
                                                            placeholder="Ej. Juan Pérez"
                                                            value={selection.name}
                                                            onChange={e => setSelection(prev => ({ ...prev, name: e.target.value }))}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-1">Celular / WhatsApp</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Phone size={18} className="text-slate-500" />
                                                        </div>
                                                        <input
                                                            required
                                                            type="tel"
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-sans"
                                                            placeholder="099 123 456"
                                                            value={selection.phone}
                                                            onChange={e => setSelection(prev => ({ ...prev, phone: e.target.value }))}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center mt-6 border-t border-white/10 pt-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(2)}
                                                        className="text-slate-400 font-medium text-sm hover:text-white"
                                                        disabled={isLoading}
                                                    >
                                                        Volver
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={isLoading || !selection.name || !selection.phone}
                                                        className="btn-primary py-3 px-8 text-base shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                                                    >
                                                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Confirmar Turno'}
                                                    </button>
                                                </div>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* PANTALLA ÉXITO */}
                                    {step === 4 && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-8"
                                        >
                                            <div className="w-20 h-20 bg-green-950/40 border border-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                                >
                                                    <CheckCircle2 size={40} className="text-green-500" />
                                                </motion.div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3">
                                                ¡Turno pre-agendado!
                                            </h3>
                                            <p className="text-slate-300 mb-8 max-w-sm mx-auto">
                                                Hola {selection.name}, recibimos tu solicitud para <strong className="text-white">{selection.specialty}</strong>. Nuestro equipo se contactará por WhatsApp al <strong className="text-white">{selection.phone}</strong> para confirmar en breve.
                                            </p>
                                            <button
                                                onClick={onClose}
                                                className="btn-secondary w-full"
                                            >
                                                Cerrar y volver a la web
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
