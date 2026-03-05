'use client';

import { useState } from 'react';
import { AgendaCalendar } from '@/components/dashboard/AgendaCalendar';
import { BookingModal } from '@/components/ui/BookingModal';

// export const metadata = {
//     title: 'Agenda | OdontoPro CRM',
// };

export default function AgendaPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold">Agenda Odontológica</h1>
                    <p className="text-slate-400 mt-1">Gestiona los turnos y sillones de manera eficiente.</p>
                </div>
                <button onClick={() => setIsBookingOpen(true)} className="btn-primary">
                    Nuevo Turno
                </button>
            </div>

            <div className="flex-1 min-h-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                <AgendaCalendar />
            </div>

            <BookingModal isOpen={isBookingOpen} onClose={() => {
                setIsBookingOpen(false);
                setTimeout(() => window.location.reload(), 500);
            }} />
        </div>
    );
}
