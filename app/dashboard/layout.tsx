'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Users, CreditCard, Settings, LayoutDashboard } from 'lucide-react';
import { UserButton } from '@insforge/nextjs';

const sidebarLinks = [
    { icon: LayoutDashboard, label: 'Resumen', href: '/dashboard' },
    { icon: Calendar, label: 'Agenda', href: '/dashboard/agenda' },
    { icon: Users, label: 'Pacientes', href: '/dashboard/pacientes' },
    { icon: CreditCard, label: 'Membresías', href: '/dashboard/membresias' },
    { icon: Settings, label: 'Configuración', href: '/dashboard/configuracion' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex">
            {/* Sidebar Nav */}
            <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-black/50 p-6 flex flex-col hidden md:flex">
                <div className="flex items-center gap-3 mb-10 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-glow-accent">
                        <span className="text-white font-display font-bold text-lg">OP</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-sm text-white">OdontoPro</span>
                        <span className="text-xs text-red-500 font-medium">Panel CRM</span>
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-2">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${isActive
                                    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={18} className={isActive ? 'text-red-500' : 'text-slate-500'} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="scale-110"><UserButton /></div>
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="text-xs font-medium text-white truncate">Mi Cuenta</span>
                        <span className="text-[10px] text-slate-400">Ajustes de perfil</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Subtle background glow for dark mode aesthetic */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10 pb-24 md:pb-8">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50 flex items-center justify-around p-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl transition-all duration-300 ${isActive
                                ? 'text-red-500 bg-red-500/10'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            <Icon size={20} className={isActive ? 'scale-110 mb-0.5' : ''} />
                            <span className="text-[10px] font-medium">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
