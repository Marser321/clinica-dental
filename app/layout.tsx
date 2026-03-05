import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { InsforgeProvider } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Clínica Dental OdontoPro | Odontología Integral de Excelencia',
  description:
    'Clínica odontológica especializada en implantes dentales, ortodoncia, cirugía bucal y rehabilitación estética. Equipo de especialistas con tecnología de última generación.',
  keywords: [
    'dentista',
    'implantes dentales',
    'ortodoncia',
    'clínica dental',
    'OdontoPro',
    'blanqueamiento dental',
    'cirugía bucal',
    'carillas dentales',
  ],
  openGraph: {
    title: 'Clínica Dental OdontoPro',
    description:
      'Odontología integral, implantes y ortodoncia con tecnología de vanguardia.',
    type: 'website',
    locale: 'es_UY',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="bg-bg-primary text-text-primary font-body" suppressHydrationWarning>
        <InsforgeProvider>
          {children}
        </InsforgeProvider>
      </body>
    </html>
  );
}
