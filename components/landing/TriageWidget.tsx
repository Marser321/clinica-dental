'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, Play, RefreshCcw, Search, HeartPulse, Sparkles, AlertCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

// Tipado de las etapas del Triage
type TriageStep = 'start' | 'symptom' | 'duration' | 'result';

export function TriageWidget() {
    const [step, setStep] = useState<TriageStep>('start');
    const [selections, setSelections] = useState({
        symptom: '',
        duration: '',
    });

    // Pregunta 1: Síntoma principal
    const symptoms = [
        { id: 'dolor', icon: AlertCircle, label: 'Tengo dolor agudo', color: 'text-rose-500', bg: 'bg-rose-950/30' },
        { id: 'estetica', icon: Sparkles, label: 'Quiero mejorar mi sonrisa', color: 'text-amber-500', bg: 'bg-amber-950/30' },
        { id: 'chequeo', icon: HeartPulse, label: 'Chequeo de rutina / Limpieza', color: 'text-red-500', bg: 'bg-red-950/30' },
        { id: 'ausencia', icon: Search, label: 'Me falta una pieza dental', color: 'text-indigo-500', bg: 'bg-indigo-950/30' },
    ];

    // Pregunta 2 (Dinámica, pero simplificada al tiempo)
    const durations = [
        { id: 'urgencia', label: '¡Es una urgencia ahora mismo!' },
        { id: 'dias', label: 'Hace unos días' },
        { id: 'meses', label: 'Hace semanas o meses' },
    ];

    // Manejo de selecciones
    const handleSymptomSelect = (id: string) => {
        setSelections((prev) => ({ ...prev, symptom: id }));
        setStep('duration');
    };

    const handleDurationSelect = (id: string) => {
        setSelections((prev) => ({ ...prev, duration: id }));
        setStep('result');
    };

    const resetTriage = () => {
        setSelections({ symptom: '', duration: '' });
        setStep('start');
    };

    // Lógica simple de recomendación 
    const getRecommendation = () => {
        const s = selections.symptom;
        const d = selections.duration;

        if (s === 'dolor') {
            return {
                title: 'Atención de Urgencia / Endodoncia',
                desc: 'El dolor agudo requiere atención inmediata para evitar infecciones mayores o pérdida de la pieza. Un especialista evaluará si requerís un tratamiento de conducto o indicación farmacológica.',
                action: 'Agendar Urgencia',
                urgent: true
            };
        }
        if (s === 'estetica') {
            return {
                title: 'Evaluación de Diseño de Sonrisa',
                desc: '¡Excelente decisión! Un especialista en estética evaluará tu caso para ofrecerte opciones como Carillas, Blanqueamiento u Ortodoncia Invisible.',
                action: 'Consultar por Estética',
                urgent: false
            };
        }
        if (s === 'ausencia') {
            return {
                title: 'Especialista en Implantes',
                desc: 'La falta de piezas dentales puede causar problemas en la mordida. Los implantes de titanio son la solución definitiva y permanente que recomendamos.',
                action: 'Evaluación para Implante',
                urgent: false
            };
        }
        return {
            title: 'Odontología General Preventiva',
            desc: 'La prevención es tu mejor aliada. Agendá un turno para realizar un examen completo, toma de radiografías digitales y una higiene profesional profunda.',
            action: 'Agendar Chequeo',
            urgent: false
        };
    };

    const result = getRecommendation();

    return (
        <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <AnimatedSection className="text-center mb-10">
                    <span className="text-red-500 text-sm font-semibold uppercase tracking-widest bg-red-950/30 px-3 py-1 rounded-full inline-block mb-3 border border-red-900/30">
                        Asistente Virtual
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-md">
                        Descubrí qué tratamiento necesitás
                    </h2>
                    <p className="text-slate-300 max-w-xl mx-auto">
                        Respondé 2 simples preguntas para que nuestro sistema te indique el especialista adecuado para tu caso.
                    </p>
                </AnimatedSection>

                {/* Contenedor Interactivo */}
                <div className="bg-[#111111]/80 backdrop-blur-md rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/5 overflow-hidden min-h-[400px] flex flex-col relative">
                    {/* Barra de Progreso */}
                    <div className="w-full h-1 bg-white/5 relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                            initial={{ width: '0%' }}
                            animate={{
                                width: step === 'start' ? '0%' :
                                    step === 'symptom' ? '33%' :
                                        step === 'duration' ? '66%' : '100%'
                            }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />
                    </div>

                    <div className="p-8 sm:p-12 flex-1 flex flex-col justify-center relative">
                        <AnimatePresence mode="wait">
                            {/* PASO: START */}
                            {step === 'start' && (
                                <motion.div
                                    key="start"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="text-center"
                                >
                                    <div className="w-20 h-20 bg-red-950/40 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-900/30 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
                                        <ShieldCheck size={36} className="text-red-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">
                                        ¿No sabés por dónde empezar?
                                    </h3>
                                    <p className="text-slate-300 mb-8 max-w-md mx-auto">
                                        Iniciá nuestro diagnóstico rápido online. Te tomará menos de 30 segundos.
                                    </p>
                                    <button
                                        onClick={() => setStep('symptom')}
                                        className="btn-primary inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(220,38,38,0.3)]"
                                    >
                                        Comenzar Diagnóstico
                                        <Play size={16} className="fill-white" />
                                    </button>
                                </motion.div>
                            )}

                            {/* PASO: SYMPTOM */}
                            {step === 'symptom' && (
                                <motion.div
                                    key="symptom"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                >
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center drop-shadow-sm">
                                        ¿Cuál es el motivo principal de tu consulta?
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {symptoms.map((s) => (
                                            <button
                                                key={s.id}
                                                onClick={() => handleSymptomSelect(s.id)}
                                                className="group text-left p-5 rounded-2xl border border-white/10 bg-black/40 hover:border-red-500/50 hover:bg-black/60 shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-all flex items-center gap-4"
                                            >
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 shrink-0 ${s.bg}`}>
                                                    <s.icon size={24} className={s.color} />
                                                </div>
                                                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                                                    {s.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* PASO: DURATION */}
                            {step === 'duration' && (
                                <motion.div
                                    key="duration"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                >
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center drop-shadow-sm">
                                        ¿Desde hace cuánto tiempo sentís esto / lo estás pensando?
                                    </h3>
                                    <div className="flex flex-col gap-3 max-w-md mx-auto">
                                        {durations.map((d) => (
                                            <button
                                                key={d.id}
                                                onClick={() => handleDurationSelect(d.id)}
                                                className="p-4 rounded-xl border border-white/10 bg-black/40 hover:bg-red-950/20 hover:border-red-500/40 hover:text-white transition-all font-medium text-slate-300 text-center shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(220,38,38,0.15)]"
                                            >
                                                {d.label}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setStep('symptom')}
                                            className="text-slate-400 text-sm mt-4 hover:text-red-400 transition-colors underline decoration-slate-600 hover:decoration-red-400"
                                        >
                                            Volver atrás
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* PASO: RESULT */}
                            {step === 'result' && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <div className="mb-6 inline-block p-4 bg-gradient-to-br from-red-950/40 to-black/60 rounded-2xl border border-red-900/30 shadow-[0_4px_20px_rgba(220,38,38,0.15)]">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-2">
                                            Recomendación del Triage
                                        </h3>
                                        <h4 className="text-2xl font-bold text-white drop-shadow-md">
                                            {result.title}
                                        </h4>
                                    </div>
                                    <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
                                        {result.desc}
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <a
                                            href="#contacto"
                                            className={`${result.urgent ? 'bg-rose-600 hover:bg-rose-700 shadow-[0_0_20px_rgba(225,29,72,0.4)] text-white' : 'btn-primary shadow-[0_4px_20px_rgba(220,38,38,0.3)]'} px-8 py-3.5 rounded-xl font-semibold transition-all flex items-center gap-2 border border-white/10`}
                                        >
                                            {result.action}
                                            <ArrowRight size={18} />
                                        </a>
                                        <button
                                            onClick={resetTriage}
                                            className="flex items-center gap-2 text-slate-400 hover:text-red-400 font-medium py-3 px-4 transition-colors"
                                        >
                                            <RefreshCcw size={16} />
                                            Rehacer test
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
