"use client";

import { useState } from "react";
import { Loader2, Copy, Check } from "lucide-react";

export type OutputType = "landingPage" | "whitepaper" | "marketingEmail" | "templateEmail" | "linkedin";

const TABS: { id: OutputType; label: string; description: string }[] = [
    { id: "landingPage", label: "Landingspagina", description: "Input voor de website landingspagina" },
    { id: "whitepaper", label: "Whitepaper", description: "Uitgebreide whitepaper tekst" },
    { id: "marketingEmail", label: "Marketingmail", description: "Commerciële productgerichte mail" },
    { id: "templateEmail", label: "Templatemail", description: "Follow-up email na klantcontact" },
    { id: "linkedin", label: "LinkedIn Post", description: "Korte en pakkende LinkedIn post" },
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
            setResults((prev) => ({ ...prev, [activeTab]: data.text }));
        } catch (err: any) {
            setError(err.message || "Unknown error");
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

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-6">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === tab.id
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800">{TABS.find((t) => t.id === activeTab)?.label}</h3>
                <p className="text-sm text-gray-500 mb-4">{TABS.find((t) => t.id === activeTab)?.description}</p>

                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-70"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Genereren...
                        </>
                    ) : (
                        "Genereer Tekst"
                    )}
                </button>
            </div>

            {error && (
                <div className="p-4 mb-4 text-red-700 bg-red-50 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {results[activeTab] && !isLoading && (
                <div className="relative mt-6">
                    <div className="absolute top-3 right-3">
                        <button
                            onClick={copyToClipboard}
                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors flex items-center gap-1 text-xs font-medium"
                            title="Kopieer tekst"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                            {copied ? "Gekopieerd" : "Kopieer"}
                        </button>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 whitespace-pre-wrap font-sans text-gray-800 text-base leading-relaxed h-[500px] overflow-y-auto">
                        {results[activeTab]}
                    </div>
                </div>
            )}
        </div>
    );
}
