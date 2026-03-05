'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { AnimatedSection, StaggerContainer, staggerItemVariants } from '@/components/ui/AnimatedSection';
import { Clock, Users, Cpu, Heart } from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';

// Hook para contador animado
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref} className="text-4xl sm:text-5xl font-display font-bold text-gradient tabular-nums">
            {count.toLocaleString()}{suffix}
        </span>
    );
}

const diferenciadores = [
    {
        icono: Cpu,
        titulo: 'Tecnología Avanzada',
        descripcion: 'Radiografías digitales, planificación 3D para implantes e instrumental rotatorio de última generación.',
    },
    {
        icono: Clock,
        titulo: 'Experiencia Comprobada',
        descripcion: 'Más de 15 años de trayectoria con formación especializada en Udelar y Ucudal.',
    },
    {
        icono: Heart,
        titulo: 'Atención Personalizada',
        descripcion: 'Cada paciente recibe un plan de tratamiento a medida, en un clima de confianza y calidez.',
    },
    {
        icono: Users,
        titulo: 'Atención Integral',
        descripcion: '11 especialidades bajo un mismo techo, desde niños hasta adultos mayores.',
    },
];

const estadisticas = [
    { valor: 15, sufijo: '+', label: 'Años de experiencia' },
    { valor: 5000, sufijo: '+', label: 'Pacientes satisfechos' },
    { valor: 11, sufijo: '', label: 'Especialidades' },
    { valor: 98, sufijo: '%', label: 'Satisfacción' },
];

export function WhyUsSection() {
    return (
        <section id="por-que" className="section-padding bg-[#0A0A0A] relative overflow-hidden">
            {/* Decoración */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-900/10 blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Título */}
                <AnimatedSection className="text-center mb-16">
                    <span className="text-red-500 text-sm font-semibold uppercase tracking-widest drop-shadow-sm">
                        ¿Por qué elegirnos?
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-white drop-shadow-md">
                        La diferencia está en los{' '}
                        <span className="text-gradient">detalles</span>
                    </h2>
                </AnimatedSection>

                {/* Diferenciadores */}
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
                    {diferenciadores.map((item, i) => (
                        <motion.div key={i} variants={staggerItemVariants}>
                            <TiltCard className="h-full bg-black/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 group border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_50px_rgba(220,38,38,0.2)] hover:border-red-500/30 transition-colors duration-400">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="w-14 h-14 rounded-xl bg-red-950/40 border border-red-900/30 flex items-center justify-center mb-5 group-hover:bg-red-900/50 transition-colors duration-300 relative z-10"
                                >
                                    <item.icono size={26} className="text-red-500" />
                                </motion.div>
                                <h3 className="font-display font-bold text-xl text-white mb-2 relative z-10">
                                    {item.titulo}
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                                    {item.descripcion}
                                </p>
                            </TiltCard>
                        </motion.div>
                    ))}
                </StaggerContainer>

                {/* Estadísticas */}
                <AnimatedSection>
                    <div className="bg-[#111111]/80 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-[0_12px_50px_rgba(0,0,0,0.6)] border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent pointer-events-none" />
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                            {estadisticas.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <AnimatedCounter target={stat.valor} suffix={stat.sufijo} />
                                    <p className="text-slate-300 text-sm mt-2">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
