"use client";

import { useState } from "react";
import GeneratorTabs from "./components/GeneratorTabs";
import { FileText, Sparkles } from "lucide-react";

export default function Home() {
    const [description, setDescription] = useState("");

    return (
        <div className="flex flex-col gap-8 w-full">
            <section className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                        <FileText className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-800">1. Productbeschrijving</h2>
                </div>
                <p className="text-slate-500 mb-5 text-sm font-medium">
                    Plak hier de volledige productbeschrijving. Deze fungeert als de intelligente basis voor alle gegenereerde content.
                </p>
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Bijvoorbeeld: Onze dienstverlening voor bodemonderzoek omvat..."
                        className="relative w-full h-56 p-5 bg-white/90 border border-slate-200 rounded-2xl shadow-sm text-slate-700 placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-y transition-all text-base leading-relaxed custom-scrollbar"
                    ></textarea>
                </div>
            </section>

            <section className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-800">2. Content Genereren</h2>
                </div>

                {description.trim() ? (
                    <GeneratorTabs description={description} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <Sparkles className="w-6 h-6 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Wachtend op input</h3>
                        <p className="text-slate-500 max-w-sm text-sm">Vul hierboven een productbeschrijving in om toegang te krijgen tot de AI-generatie tools.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
