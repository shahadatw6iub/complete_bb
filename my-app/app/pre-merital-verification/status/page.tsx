import Footer from '@/components/bibaho-bondhon/Footer';
import { AuroraBackground } from '@/components/ui/aurora-background';
import React from 'react';

// Mock data for demo purposes
const mockNFTs = [
    {
        id: 1,
        title: 'Marriage 1',
        date: '2024-01-15',
        type: 'Marriage',
    },
    {
        id: 2,
        title: 'Divorce 1',
        date: '2025-06-20',
        type: 'Divorce',
    },
    {
        id: 3,
        title: 'Marriage 2',
        date: '2026-03-10',
        type: 'Marriage',
    },
];

function Page() {
    return (
        <main>
            <AuroraBackground>
                <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black mt-10 mb-10 overflow-x-auto text-white">
                    <h1 className="text-2xl font-bold mb-6">NFTs for Karim Bhuiyan</h1>

                    <div className="space-y-4">
                        {mockNFTs.map((nft) => (
                            <div
                                key={nft.id}
                                className="p-4 border border-gray-700 rounded-lg bg-gray-800 flex justify-between"
                            >
                                <div>
                                    <p className="font-semibold">{nft.title}</p>
                                    <p className="text-sm text-gray-400">{nft.date}</p>
                                </div>
                                <div className="text-sm font-medium">{nft.type}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </AuroraBackground>
            <Footer />

        </main>
    );
}

export default Page;
