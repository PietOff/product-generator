"use client";

import { useState } from "react";
import GeneratorTabs from "./components/GeneratorTabs";

export default function Home() {
    const [description, setDescription] = useState("");

    return (
        <div className="flex flex-col gap-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Input: Productbeschrijving</h2>
                <p className="text-gray-600 mb-4 text-sm">
                    Plak hier de volledige productbeschrijving. Deze dient als basis voor de te genereren marketingmaterialen.
                </p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Voer hier de productbeschrijving in..."
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y transition-all"
                ></textarea>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Output Genereren</h2>
                {description.trim() ? (
                    <GeneratorTabs description={description} />
                ) : (
                    <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 italic">Voer eerst een productbeschrijving in om content te genereren.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
