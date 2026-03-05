import { UserButton } from '@insforge/nextjs';
import { auth } from '@insforge/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-bg-primary text-white p-8">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-3xl font-display font-bold">Portal de Gestión</h1>
                    <p className="text-slate-400">Bienvenido a OdontoPro</p>
                </div>
                <UserButton />
            </header>

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-medium mb-4">Próximas Citas</h2>
                    <p className="text-slate-400">Aún no hay citas agendadas.</p>
                </div>
            </div>
        </div>
    );
}
