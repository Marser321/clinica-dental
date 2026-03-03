'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
    Sparkles, ShieldCheck, Layers, Scissors, Anchor, Stethoscope,
    Baby, AlignCenter, HeartPulse, ScanLine, Crosshair, ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { servicios } from '@/lib/servicios-data';
import { AnimatedSection, StaggerContainer, staggerItemVariants } from '@/components/ui/AnimatedSection';
import { SplineScene } from '@/components/ui/SplineScene';

// Mapeo de nombres de icono a componentes
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Sparkles, ShieldCheck, Layers, Scissors, Anchor, Stethoscope,
    Baby, AlignCenter, HeartPulse, ScanLine, Crosshair,
};

// Slugs que tienen animación especial
const animacionEspecial: Record<string, string> = {
    'rayos-x': 'scanner',
    'odontologia-ninos': 'bounce',
};

export function ServicesSection() {
    return (
        <section id="servicios" className="section-padding relative overflow-hidden bg-white">
            {/* Decoración */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-50/60 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Título */}
                <AnimatedSection className="text-center mb-16">
                    <span className="text-accent text-sm font-semibold uppercase tracking-widest">
                        Nuestros Servicios
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-slate-900">
                        Atención integral para{' '}
                        <span className="text-gradient">toda la familia</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg">
                        Ofrecemos 11 especialidades para cubrir todas tus necesidades de salud
                        bucal, desde prevención hasta rehabilitación completa.
                    </p>
                </AnimatedSection>

                {/* Grid de servicios */}
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {servicios.map((servicio) => {
                        const Icon = iconMap[servicio.icono] || Stethoscope;
                        const anim = animacionEspecial[servicio.slug];

                        return (
                            <motion.div key={servicio.slug} variants={staggerItemVariants}>
                                <Link
                                    href={`/servicios/${servicio.slug}`}
                                    className={`
                                        bg-white rounded-2xl p-6 sm:p-7 flex flex-col h-full group relative overflow-hidden cursor-pointer
                                        border border-slate-100 shadow-[0_4px_24px_rgba(15,23,42,0.05)]
                                        hover:shadow-[0_12px_40px_rgba(8,145,178,0.12)] hover:border-cyan-200/60
                                        hover:-translate-y-1 transition-all duration-400
                                        ${servicio.slug === 'odontologia-ninos' ? 'hover:bg-amber-50/30' : ''}
                                    `}
                                >
                                    {/* Efecto escáner para Rayos X */}
                                    {anim === 'scanner' && (
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                                            <div
                                                className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-emerald-200/25 to-transparent"
                                                style={{ animation: 'scanner-sweep 2.5s ease-in-out infinite' }}
                                            />
                                        </div>
                                    )}

                                    {/* Glow decorativo hover */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle at 50% 50%, ${servicio.colorHex}08 0%, transparent 70%)`,
                                        }}
                                    />

                                    {/* Icono o Imagen 3D */}
                                    <div
                                        className={`
                                            w-16 h-16 rounded-xl flex items-center justify-center mb-5 
                                            transition-all duration-500 group-hover:scale-[1.15] relative z-10 overflow-hidden
                                            ${anim === 'bounce' ? 'group-hover:animate-[elastic-bounce_0.6s_ease-in-out]' : ''}
                                        `}
                                        style={{
                                            background: `${servicio.colorHex}12`,
                                            border: `1px solid ${servicio.colorHex}20`,
                                        }}
                                    >
                                        <Image
                                            src={`/images/servicios/${servicio.slug}.png`}
                                            alt={servicio.titulo}
                                            width={50}
                                            height={50}
                                            className="object-contain drop-shadow-[0_4px_10px_rgba(8,145,178,0.15)]"
                                        />
                                    </div>

                                    {/* Texto */}
                                    <h3 className="font-display font-bold text-lg text-slate-800 mb-2 relative z-10">
                                        {servicio.titulo}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed flex-1 relative z-10">
                                        {servicio.descripcionCorta}
                                    </p>

                                    {/* Link */}
                                    <div className="flex items-center gap-2 mt-5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 relative z-10">
                                        <span>Ver más</span>
                                        <ArrowRight size={14} />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </StaggerContainer>
            </div>
        </section>
    );
}
