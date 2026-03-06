import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PROMPTS: Record<string, string> = {
    landingPage: `Je bent een ervaren copywriter voor AbelTalent. Schrijf een converterende, professionele tekst voor een landingspagina op basis van de onderstaande productbeschrijving. De tekst moet wervend zijn, de pijnpunten van de doelgroep aanspreken en duidelijk maken hoe AbelTalent dit oplost. Gebruik tussenkopjes en opsommingstekens waar nuttig. Focus op de toegevoegde waarde en expertise.`,

    whitepaper: `Je bent een materiedeskundige en copywriter voor AbelTalent. Schrijf een uitgebreide, inhoudelijke tekst voor een whitepaper op basis van de onderstaande productbeschrijving. De tekst moet diepgaand ingaan op het probleem, de marktsituatie, en uitgebreid toelichten hoe de oplossing van AbelTalent werkt. Zorg voor een professionele, adviserende tone of voice. Gebruik een logische structuur met inleiding, kern (opgedeeld met tussenkopjes), en een krachtige conclusie.`,

    marketingEmail: `Je bent een e-mailmarketeer voor AbelTalent. Schrijf een commerciële, productgerichte e-mail naar bestaande/warme relaties over de onderstaande productbeschrijving. Het doel is interesse wekken en aanzetten tot een gesprek (Call to Action: plan een afspraak). De toon is professioneel, overtuigend, en relatief kort. Formatteer de mail met een pakkende onderwerpregel.`,

    templateEmail: `Je bent een accountmanager bij AbelTalent. Schrijf een korte, persoonlijke follow-up e-mail template voor na een eerste overleg met een klant. De mail moet de kern van het besprokene (op basis van de onderstaande productbeschrijving) samenvatten, de pijnpunten kort benoemen, en de voorgestelde oplossing herhalen. Sluit af met een actiepunt voor de klant of een moment om te bellen. Toon is informeel zakelijk en behulpzaam.`,

    linkedin: `Je bent een social media manager voor AbelTalent. Schrijf een korte, pakkende en professionele LinkedIn post op basis van de onderstaande productbeschrijving. De post moet de aandacht trekken, een probleem/oplossing inzicht geven en eindigen met een Call to Action (bijvoorbeeld: neem contact op of lees meer op onze website). Gebruik relevante en professionele hashtags en maximaal 3 relevante emoji's.`
};

export async function POST(req: Request) {
    try {
        const { description, type } = await req.json();

        if (!description || !type) {
            return NextResponse.json(
                { error: 'Description and type are required' },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'GEMINI_API_KEY environment variable is missing' },
                { status: 500 }
            );
        }

        const systemPrompt = PROMPTS[type];

        if (!systemPrompt) {
            return NextResponse.json(
                { error: 'Invalid output type' },
                { status: 400 }
            );
        }

        const fullPrompt = `${systemPrompt}\n\nHIER IS DE PRODUCTBESCHRIJVING:\n\n${description}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: fullPrompt,
        });

        return NextResponse.json({ text: response.text });
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Error generating content' },
            { status: 500 }
        );
    }
}
