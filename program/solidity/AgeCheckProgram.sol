@program_id("2ad8DBPeF2dUXHat4b9kdKwMTNtRwAquNxYWJxxGu8ac")
contract AgeCheckProgram {
    bool public isEligible = false;
    address public bride;
    address public groom;

    @payer(payer)
    constructor(address payer) {
        print("Age Check Contract Initialized");
    }

    function checkAges(uint8 brideAge, uint8 groomAge) public {
        require(brideAge >= 18, "Bride must be at least 18 years old.");
        require(groomAge >= 21, "Groom must be at least 21 years old.");

        // Set the eligibility flag
        isEligible = true;
    }

    function getEligibility() public view returns (bool) {
        return isEligible;
    }
}
