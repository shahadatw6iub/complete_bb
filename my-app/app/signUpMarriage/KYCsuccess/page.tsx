"use client";

import { useSearchParams } from 'next/navigation';
import { SignMessage } from '../../../components/sol_comp/SignMessage';
import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program } from '@project-serum/anchor';
import idl from '../../../../program/target/idl/AgeCheckProgram.json'; // Adjust the path to your IDL file

function calculateAge(dob: string | number | Date) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export default function Page() {
    const searchParams = useSearchParams();
    const dob1 = searchParams?.get('var1') || '';
    const dob2 = searchParams?.get('var2') || '';

    const [isEligible, setIsEligible] = useState<boolean | null>(null);

    const age1 = dob1 ? calculateAge(dob1) : '';
    const age2 = dob2 ? calculateAge(dob2) : '';

    useEffect(() => {
        if (age1 && age2) {
            checkAgesWithSmartContract(age1, age2);
        }
    }, [age1, age2]);

    const checkAgesWithSmartContract = async (brideAge: number, groomAge: number) => {
        try {
            // Replace with your Alchemy RPC URL
            const connection = new Connection('https://solana-devnet.g.alchemy.com/v2/fXOeARtK2TCJkv-lZ6n1OYbUCef-1F0O', { commitment: 'confirmed' });
            const provider = new AnchorProvider(connection, window.solana, 'confirmed');
            const program = new Program(idl, idl.metadata.address, provider);

            // Replace 'YOUR_DATA_ACCOUNT_PUBLIC_KEY' with the actual public key of your data account
            const dataAccount = new PublicKey('HAbMEtR1mgqAqNnTAzZGEdkgjKFXUufasKCN8JoEnyDV');

            // Call the checkAges method on the smart contract
            await program.methods
                .checkAges(brideAge, groomAge)
                .accounts({
                    dataAccount: dataAccount,
                })
                .rpc();

            // Fetch the eligibility result from the smart contract
            const eligibility = await program.methods.getEligibility()
                .accounts({
                    dataAccount: dataAccount,
                })
                .view(); // Use 'view' method to call read functions

            setIsEligible(eligibility);
        } catch (error) {
            console.error('Error checking ages with smart contract:', error);
            setIsEligible(false);
        }
    };

    return (
        <div>
            <p>Age 1: {age1}</p>
            <p>Age 2: {age2}</p>
            {isEligible !== null && (
                <p>Eligibility: {isEligible ? 'Eligible' : 'Not Eligible'}</p>
            )}
            <SignMessage />
        </div>
    );
}
