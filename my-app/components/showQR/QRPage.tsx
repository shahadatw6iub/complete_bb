"use client";
import DefaultLayout from "./layouts/DefaultLayout";
import { NextSeoProps } from "next-seo";
import styles from "./styles/Home.module.css";
import { useEffect, useRef } from "react";
import { createQR, encodeURL } from "@solana/pay";
import { LinkCardGrid } from "./LinkCard";
import { NoticeMessage, DevnetNotice } from "./NoticeMessage";

const QR_CODE_SIZE = 350;

const seo: NextSeoProps = {
  // title: "Mint cNFTs using Solana Pay",
};

export default function QRPage() {
  // Define refs to populate the QR codes in the UI
  const brideQrRef = useRef<HTMLDivElement>(null);
  const groomQrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { location } = window;

    // Generate QR code for the bride
    const brideApiUrl = `${location.protocol}//${location.host}/api/mint/bride`;
    const brideQr = createQR(
      encodeURL({ link: new URL(brideApiUrl) }),
      QR_CODE_SIZE,
      "transparent",
      "white"
    );
    if (brideQrRef.current) {
      brideQrRef.current.innerHTML = "";
      brideQr.append(brideQrRef.current);
    }

    // Generate QR code for the groom
    const groomApiUrl = `${location.protocol}//${location.host}/api/mint/groom`;
    const groomQr = createQR(
      encodeURL({ link: new URL(groomApiUrl) }),
      QR_CODE_SIZE,
      "transparent",
      "white"
    );
    if (groomQrRef.current) {
      groomQrRef.current.innerHTML = "";
      groomQr.append(groomQrRef.current);
    }
  }, []);

  return (
    <DefaultLayout seo={seo}>
      <div className="">
        <div className="mb-10 space-y-10">
          <p className={styles.tagline}>
            Scan with a Solana wallet
            <br /> to mint a compressed NFT for Bride and Groom
          </p>
        </div>

        <div className="items-center justify-center space-y-10">
          <DevnetNotice>
            <NoticeMessage>
              This app is connected to Solana&apos;s{" "}
              <span className="underline">devnet</span>.
              <br />
              Please ensure <span className="underline">your wallet</span> is
              connected to devnet.
            </NoticeMessage>
          </DevnetNotice>

          <div className="flex flex-col items-center space-y-8">
            {/* QR Code for Bride */}
            <div>
              <p className="text-center text-white">Bride's QR Code</p>
              <div
                ref={brideQrRef}
                className={`qrBox w-[${QR_CODE_SIZE}px] h-[${QR_CODE_SIZE}px]`}
              ></div>
            </div>

            {/* QR Code for Groom */}
            <div>
              <p className="text-center text-white">Groom's QR Code</p>
              <div
                ref={groomQrRef}
                className={`qrBox w-[${QR_CODE_SIZE}px] h-[${QR_CODE_SIZE}px]`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
