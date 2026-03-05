import Link from 'next/link';
import { servicios } from '@/lib/servicios-data';
import { Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#0A0A0A] text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Marca */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.3)] border border-red-500/20">
                                <span className="text-white font-display font-bold text-lg">OP</span>
                            </div>
                            <div>
                                <span className="font-display font-bold text-sm text-white">OdontoPro</span>
                                <p className="text-xs text-slate-400 -mt-0.5">Clínica Dental</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Odontología integral con especialización en implantes, ortodoncia y rehabilitación
                            estética. Nuestro equipo trabaja para cuidar tu sonrisa.
                        </p>
                    </div>

                    {/* Servicios */}
                    <div>
                        <h4 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
                            Servicios
                        </h4>
                        <ul className="space-y-2.5">
                            {servicios.slice(0, 6).map((s) => (
                                <li key={s.slug}>
                                    <Link
                                        href={`/servicios/${s.slug}`}
                                        className="text-slate-400 text-sm hover:text-red-500 transition-colors duration-200"
                                    >
                                        {s.titulo}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Más servicios */}
                    <div>
                        <h4 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
                            Más Servicios
                        </h4>
                        <ul className="space-y-2.5">
                            {servicios.slice(6).map((s) => (
                                <li key={s.slug}>
                                    <Link
                                        href={`/servicios/${s.slug}`}
                                        className="text-slate-400 text-sm hover:text-red-500 transition-colors duration-200"
                                    >
                                        {s.titulo}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
                            Contacto
                        </h4>
                        <ul className="space-y-2.5 text-slate-400 text-sm">
                            <li>📍 Av. Principal 1234, Uruguay</li>
                            <li>📞 +598 0000 0000</li>
                            <li>✉️ contacto@odontopro.uy</li>
                            <li>🕐 Lun-Vie: 9:00 - 19:00</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} OdontoPro Clínica Dental. Todos los derechos reservados.
                    </p>
                    <p className="text-slate-500 text-xs flex items-center gap-1">
                        Hecho por M Morera Agency
                    </p>
                </div>
            </div>
        </footer>
    );
}
