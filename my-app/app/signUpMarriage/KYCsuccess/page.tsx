"use client";

import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { AgeCheckProgram } from "../../../../program/target/types/AgeCheckProgram";
import { useSearchParams } from 'next/navigation';
import { SignMessage } from '../../../components/sol_comp/SignMessage';
import { useState, useEffect } from 'react';
import {
    connection,
    commitmentLevel,
    ageprogramId,
    ageprogramInterface,
} from "../../../utils/constants";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";

// Function to calculate age from DOB
function calculateAge(dob: string) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust if birthday hasn't occurred this year yet
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export default function Page() {
    const searchParams = useSearchParams();
    const dob1 = searchParams?.get('var1') || ''; // Bride's DOB
    const dob2 = searchParams?.get('var2') || ''; // Groom's DOB
    const [isEligible, setIsEligible] = useState<boolean | null>(null);
    const wallet = useAnchorWallet();

    // Calculate ages
    const age1 = dob1 ? calculateAge(dob1) : null;
    const age2 = dob2 ? calculateAge(dob2) : null;

    useEffect(() => {
        if (age1 !== null && age2 !== null && wallet) {
            checkAge(age1, age2, wallet);
        }
    }, [age1, age2, wallet]);

    async function checkAge(brideAge: number, groomAge: number, wallet: AnchorWallet) {
        const provider = new AnchorProvider(connection, wallet, {
            preflightCommitment: commitmentLevel,
        });

        const program = new Program(
            ageprogramInterface,
            ageprogramId,
            provider
        ) as Program<AgeCheckProgram>;

        try {
            // Check ages using the smart contract
            await program.rpc.checkAges(brideAge, groomAge, {
                accounts: {
                    dataAccount: new web3.PublicKey("your-data-account-public-key-here")
                }
            });

            // Fetch eligibility result from the contract
            const eligibilityResponse: any = await program.rpc.getEligibility({
                accounts: {
                    dataAccount: new web3.PublicKey("your-data-account-public-key-here")
                }
            });

            // Convert the response to a boolean if it's a string
            const eligibility: boolean = eligibilityResponse === 'true' || eligibilityResponse === true;

            setIsEligible(eligibility);
        } catch (error) {
            console.error("Error checking eligibility:", error);
            setIsEligible(false);
        }
    }

    return (
        <div>
            <p>Age 1 (Bride): {age1}</p>
            <p>Age 2 (Groom): {age2}</p>
            {isEligible !== null && (
                <p>Eligibility: {isEligible ? 'Eligible' : 'Not Eligible'}</p>
            )}
            <SignMessage />
        </div>
    );
}
