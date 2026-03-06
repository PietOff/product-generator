import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
    title: "AbelTalent | Product Generator",
    description: "Zet productbeschrijvingen om in marketingmaterialen met AI.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="nl">
            <body className={`${inter.variable} font-sans min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900`}>
                <div className="fixed top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10">
                    <header className="mb-12 flex flex-col items-center justify-center text-center pt-8">
                        <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/25 mb-6 ring-1 ring-white/50">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 tracking-tight mb-4">
                            AI Content Generator
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
                            Zet een productbeschrijving moeiteloos om in hoogwaardige landingspagina's, whitepapers, e-mails en LinkedIn posts.
                        </p>
                    </header>
                    <main className="relative z-10">{children}</main>
                </div>
            </body>
        </html>
    );
}
