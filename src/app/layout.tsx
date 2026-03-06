export const metadata = {
    title: "Product Description Generator",
    description: "Generate marketing materials from a product description",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="nl">
            <body className="antialiased min-h-screen bg-gray-50 text-gray-900">
                <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                    <header className="mb-8 border-b pb-4">
                        <h1 className="text-3xl font-bold text-blue-900 tracking-tight">AbelTalent</h1>
                        <p className="text-gray-600 mt-1">Product Description Generator</p>
                    </header>
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
