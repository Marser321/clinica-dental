'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, MessageCircleQuestion } from 'lucide-react';
import { AnimatedSection, StaggerContainer, staggerItemVariants } from '@/components/ui/AnimatedSection';

const faqs = [
    {
        pregunta: '¿Los tratamientos como implantes o conducto duelen?',
        respuesta: 'No. En OdontoPro utilizamos anestesia local de última generación y, para pacientes con ansiedad, ofrecemos sedación consciente. Nuestro objetivo principal es garantizar una experiencia libre de dolor y molestias en todo momento.'
    },
    {
        pregunta: '¿Toman radiografías en la primera consulta?',
        respuesta: 'Sí, contamos con equipamiento de radiología digital integrado. En tu primera visita de evaluación, tomaremos las imágenes necesarias para brindarte un diagnóstico preciso sin necesidad de que te traslades a otro centro.'
    },
    {
        pregunta: '¿Cuáles son los medios de pago aceptados?',
        respuesta: 'Aceptamos todas las tarjetas de crédito y débito. Además, para tratamientos extendidos como Ortodoncia o múltiples Implantes, diseñamos planes de financiación a medida que se ajustan a tus posibilidades.'
    },
    {
        pregunta: '¿Cuánto demora un tratamiento de Diseño de Sonrisa (Carillas)?',
        respuesta: 'El proceso suele completarse en 2 a 3 sesiones distribuidas en un par de semanas. Primero escaneamos y diseñamos tu sonrisa digitalmente para que la apruebes, y luego procedemos a la instalación de las carillas definitivas de porcelana.'
    },
    {
        pregunta: 'Tengo una urgencia dental, ¿atienden sin turno previo?',
        respuesta: 'Recomendamos siempre contactarnos primero por teléfono o WhatsApp. Si evaluamos que tu caso es una urgencia real (dolor agudo, trauma, inflamación severa), te haremos un espacio en la agenda ese mismo día.'
    }
];

export function FaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="section-padding bg-[#0A0A0A] relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <AnimatedSection className="text-center mb-16 lg:mb-20">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-950/40 to-black/60 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(220,38,38,0.15)] border border-red-900/30">
                        <MessageCircleQuestion size={28} className="text-red-500" />
                    </div>
                    <span className="text-red-500 text-sm font-semibold uppercase tracking-widest bg-red-950/30 border border-red-900/30 px-3 py-1 rounded-full inline-block mb-3 drop-shadow-sm">
                        Dudas Comunes
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-white drop-shadow-md">
                        Preguntas <span className="text-gradient">Frecuentes</span>
                    </h2>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Resolvemos tus principales inquietudes para que vengas a tu próxima consulta con total tranquilidad y confianza.
                    </p>
                </AnimatedSection>

                <StaggerContainer className="flex flex-col gap-4">
                    {faqs.map((faq, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <motion.div
                                key={index}
                                variants={staggerItemVariants}
                                className="group"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className={`w-full text-left px-6 py-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${isActive
                                        ? 'bg-black/60 border-red-500/50 shadow-[0_4px_15px_rgba(220,38,38,0.2)]'
                                        : 'bg-[#111111]/80 backdrop-blur-md border-white/5 hover:border-red-500/30 hover:shadow-[0_4px_15px_rgba(0,0,0,0.5)]'
                                        }`}
                                >
                                    <span className={`font-semibold text-lg md:text-xl transition-colors ${isActive ? 'text-white drop-shadow-sm' : 'text-slate-300 group-hover:text-white'}`}>
                                        {faq.pregunta}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-red-900/50 text-red-500' : 'bg-white/5 text-slate-400 group-hover:bg-red-950/40 group-hover:text-red-400'}`}>
                                        {isActive ? <Minus size={18} /> : <Plus size={18} />}
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 text-slate-300 leading-relaxed bg-black/40 border-x border-b border-red-900/20 rounded-b-2xl -mt-2 pt-6">
                                                {faq.respuesta}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </StaggerContainer>

                {/* CTA Auxiliar */}
                <AnimatedSection delay={0.4} className="mt-12 text-center">
                    <p className="text-slate-400 mb-4">¿Tenés alguna otra consulta?</p>
                    <a href="#contacto" className="text-red-500 font-semibold hover:underline">
                        Escribinos directamente &rarr;
                    </a>
                </AnimatedSection>
            </div>
        </section>
    );
}
