"use client";

import { useState } from "react";
import { Loader2, Copy, Check, LayoutTemplate, FileText, Mail, MessageSquare, Linkedin, Zap } from "lucide-react";

export type OutputType = "landingPage" | "whitepaper" | "marketingEmail" | "templateEmail" | "linkedin";

const TABS: { id: OutputType; label: string; description: string; icon: any; color: string }[] = [
    { id: "landingPage", label: "Landingspagina", description: "Wervende website tekst met duidelijke structuur", icon: LayoutTemplate, color: "text-blue-600 bg-blue-50" },
    { id: "whitepaper", label: "Whitepaper", description: "Uitgebreide inhoudelijke en adviserende tekst", icon: FileText, color: "text-emerald-600 bg-emerald-50" },
    { id: "marketingEmail", label: "Marketingmail", description: "Commerciële mail gericht op het inplannen van een afspraak", icon: Mail, color: "text-violet-600 bg-violet-50" },
    { id: "templateEmail", label: "Follow-up", description: "Persoonlijke follow-up na een klantcontact", icon: MessageSquare, color: "text-amber-600 bg-amber-50" },
    { id: "linkedin", label: "LinkedIn Post", description: "Korte en pakkende social post met hashtags", icon: Linkedin, color: "text-sky-600 bg-sky-50" },
];

export default function GeneratorTabs({ description }: { description: string }) {
    const [activeTab, setActiveTab] = useState<OutputType>("landingPage");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description, type: activeTab }),
            });

            if (!response.ok) {
                throw new Error("Er is een fout opgetreden bij het genereren.");
            }

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setResults((prev) => ({ ...prev, [activeTab]: data.text }));
        } catch (err: any) {
            setError(err.message || "Onbekende fout opgetreden bij de API.");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        const text = results[activeTab];
        if (text) {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const activeTabConfig = TABS.find((t) => t.id === activeTab);
    const Icon = activeTabConfig?.icon;

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
                {TABS.map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap border ${isActive
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 scale-100"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 scale-95 hover:scale-100"
                                }`}
                        >
                            <TabIcon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-1">
                        {Icon && <Icon className={`w-5 h-5 ${activeTabConfig?.color.split(' ')[0]}`} />}
                        {activeTabConfig?.label}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">{activeTabConfig?.description}</p>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="group relative flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-70 disabled:grayscale w-full sm:w-auto justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12"></div>
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin relative z-10" /> <span className="relative z-10">Genereren...</span>
                        </>
                    ) : (
                        <>
                            <Zap className="w-5 h-5 relative z-10 fill-white" /> <span className="relative z-10">Genereer Content</span>
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="p-5 mb-6 text-red-600 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3 animate-in slide-in-from-top-2">
                    <div className="p-1 bg-red-100 rounded-lg shrink-0">
                        <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <p className="text-sm font-medium pt-0.5">{error}</p>
                </div>
            )}

            {results[activeTab] && !isLoading && (
                <div className="relative mt-8 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={copyToClipboard}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all shadow-sm ${copied
                                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied ? "Gekopieerd" : "Kopieer Tekst"}
                        </button>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="prose prose-slate max-w-none font-sans text-slate-700 text-[15px] leading-relaxed max-h-[600px] overflow-y-auto pr-2 custom-scrollbar whitespace-pre-wrap">
                                {results[activeTab]}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
