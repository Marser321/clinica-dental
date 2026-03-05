'use client';

import { motion } from 'motion/react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        servicio: '',
        mensaje: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Número de la clínica (asegurate de configurarlo bien)
        const numeroClinica = '59800000000'; // EJ: 59899123456

        let textoPredefinido = `Hola! Soy ${formData.nombre}.`;

        if (formData.servicio) {
            textoPredefinido += ` Me interesa el servicio de ${formData.servicio}.`;
        }

        if (formData.mensaje) {
            textoPredefinido += `\n\nMi consulta es: ${formData.mensaje}`;
        }

        const url = `https://wa.me/${numeroClinica}?text=${encodeURIComponent(textoPredefinido)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section id="contacto" className="section-padding bg-[#111111] relative overflow-hidden">
            {/* Decoración */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-red-900/10 blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Título */}
                <AnimatedSection className="text-center mb-16">
                    <span className="text-red-500 text-sm font-semibold uppercase tracking-widest drop-shadow-sm">
                        Contacto
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-white drop-shadow-md">
                        Agendá tu{' '}
                        <span className="text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">consulta</span>
                    </h2>
                    <p className="text-slate-300 max-w-xl mx-auto">
                        Estamos para ayudarte. Escribinos por WhatsApp o completá el formulario
                        y te responderemos a la brevedad.
                    </p>
                </AnimatedSection>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Info de contacto */}
                    <AnimatedSection direction="left">
                        <div className="space-y-8">
                            {/* WhatsApp CTA */}
                            <motion.a
                                href="https://wa.me/59800000000?text=Hola%2C%20quiero%20agendar%20una%20consulta"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-2xl p-6 group cursor-pointer border border-green-900/30 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-green-500/50 hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)] transition-all"
                            >
                                <div className="w-14 h-14 rounded-xl bg-green-950/40 border border-green-900/30 flex items-center justify-center group-hover:bg-green-900/60 transition-colors flex-shrink-0">
                                    <MessageCircle size={26} className="text-green-500" />
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-white">WhatsApp</h4>
                                    <p className="text-green-500 text-sm font-medium">Escribinos ahora →</p>
                                </div>
                            </motion.a>

                            {/* Info items */}
                            <div className="space-y-5">
                                {[
                                    { icono: Phone, label: 'Teléfono', valor: '+598 0000 0000' },
                                    { icono: Mail, label: 'Email', valor: 'contacto@drdiegomari.com' },
                                    { icono: MapPin, label: 'Ubicación', valor: 'Uruguay' },
                                    { icono: Clock, label: 'Horarios', valor: 'Lun-Vie: 9:00 - 19:00' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center flex-shrink-0">
                                            <item.icono size={18} className="text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs uppercase tracking-wider">{item.label}</p>
                                            <p className="text-slate-200 text-sm font-medium">{item.valor}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Formulario */}
                    <AnimatedSection direction="right" delay={0.2}>
                        <form
                            className="bg-black/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 space-y-5 border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="nombre" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                                        Nombre
                                    </label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        required
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all font-sans"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telefono" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                                        Teléfono
                                    </label>
                                    <input
                                        id="telefono"
                                        type="tel"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        placeholder="Tu teléfono"
                                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all font-sans"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="servicio" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                                    Servicio de interés
                                </label>
                                <select
                                    id="servicio"
                                    value={formData.servicio}
                                    onChange={handleChange}
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all appearance-none [&>option]:bg-[#1A1A1A]"
                                >
                                    <option value="">Seleccioná un servicio</option>
                                    <option value="Blanqueamiento Dental">Blanqueamiento Dental</option>
                                    <option value="Bruxismo">Bruxismo</option>
                                    <option value="Carillas Dentales">Carillas Dentales</option>
                                    <option value="Cirugía Bucal">Cirugía Bucal</option>
                                    <option value="Implantes Dentales">Implantes Dentales</option>
                                    <option value="Odontología General">Odontología General</option>
                                    <option value="Odontología para Niños">Odontología para Niños</option>
                                    <option value="Ortodoncia">Ortodoncia</option>
                                    <option value="Periodoncia">Periodoncia</option>
                                    <option value="Rayos X">Rayos X</option>
                                    <option value="Tratamiento de Conducto">Tratamiento de Conducto</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="mensaje" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                                    Mensaje
                                </label>
                                <textarea
                                    id="mensaje"
                                    rows={4}
                                    required
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    placeholder="Contanos en qué podemos ayudarte..."
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none font-sans"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="btn-primary w-full flex items-center justify-center gap-2 text-base"
                            >
                                <Send size={18} />
                                Enviar Mensaje
                            </motion.button>
                        </form>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
