@program_id("2ad8DBPeF2dUXHat4b9kdKwMTNtRwAquNxYWJxxGu8ac")
contract AgeCheckProgram {
    bool private isEligible = false;

    @payer(payer)
    constructor(address payer) {
        print("Age Check Contract Initialized");
    }

    function checkAges(uint8 age1, uint8 age2) public {
        if (age1 >= 18 && age2 >= 21) {
            isEligible = true;
        } else {
            isEligible = false;
        }
    }

    function getEligibility() public view returns (bool) {
        return isEligible;
    }
}
