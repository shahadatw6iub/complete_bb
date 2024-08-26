"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { cn } from "../../utils/cn";
import ScanAndInput from "../../components/bibaho-bondhon/ScanAndInput"; // Adjust the path as necessary

function WalletScanForm() {
  const [showBrideScanner, setShowBrideScanner] = useState(false);
  const [showGroomScanner, setShowGroomScanner] = useState(false);

  const handleBrideScan = () => {
    setShowBrideScanner(true);
  };

  const handleGroomScan = () => {
    setShowGroomScanner(true);
  };

  const handleScanComplete = (data: string, isBride: boolean) => {
    console.log(isBride ? "Bride Wallet: " : "Groom Wallet: ", data);
    if (isBride) {
      setShowBrideScanner(false);
    } else {
      setShowGroomScanner(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-200 dark:text-neutral mt-6">
        Wallet QR Scans
      </h2>

      <div className="my-8">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="brideWallet">Bride Wallet</Label>
          <button
            onClick={handleBrideScan}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Scan Bride Wallet QR
            <BottomGradient />
          </button>
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="groomWallet">Groom Wallet</Label>
          <button
            onClick={handleGroomScan}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Scan Groom Wallet QR
            <BottomGradient />
          </button>
        </LabelInputContainer>

        {/* Conditionally render the scanner components */}
        {showBrideScanner && (
          <ScanAndInput
            onScan={(data) => handleScanComplete(data, true)}
          />
        )}
        {showGroomScanner && (
          <ScanAndInput
            onScan={(data) => handleScanComplete(data, false)}
          />
        )}
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default WalletScanForm;
