import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AgeCheckProgram } from "../target/types/AgeCheckProgram";

describe("AgeCheckProgram", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const programId = new anchor.web3.PublicKey("2ad8DBPeF2dUXHat4b9kdKwMTNtRwAquNxYWJxxGu8ac");
  const program = new Program<AgeCheckProgram>(
    require("../target/idl/AgeCheckProgram.json"),
    programId,
    provider
  );

  const dataAccount = anchor.web3.Keypair.generate();

  it("Checks if the program is initialized", async () => {
    const tx = await program.methods
      .new(provider.wallet.publicKey)
      .accounts({
        dataAccount: dataAccount.publicKey,
      })
      .signers([dataAccount])
      .rpc();
    console.log("Transaction signature:", tx);
  });

  it("Performs a simple operation", async () => {
    await program.methods
      .checkAges(20, 22)
      .accounts({ dataAccount: dataAccount.publicKey })
      .rpc();

    const isEligible = await program.methods
      .getEligibility()
      .accounts({ dataAccount: dataAccount.publicKey })
      .view();

    console.log("Eligibility (20, 22):", isEligible);
  });
});
