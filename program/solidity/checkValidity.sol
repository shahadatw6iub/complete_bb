import 'solana';

@program_id("HhyHdhSbLPcN3mTa4iCC15PJuGpRWwYbU4muvgqe6LfB")
contract checkValidity {

    struct Person {
        uint64 nid;
        string full_name;
        string father_name;
        string mother_name;
        string date_of_birth;
        string gender;
        string blood_group;
        string issue_date;
        string expiry_date;
        bytes32 fingerprintHash; // Using bytes32 for the fingerprint hash
    }

    @payer(payer)
    @seed("age_verification_seed")
    constructor(
        @seed bytes payer,
        @bump bytes1 bump
    ) {
        print("AgeVerification contract initialized");
    }

    function isOver18(Person memory person) public view returns (bool) {
        uint64 age = _calculateAge(person.date_of_birth);
        return age >= 18;
    }

    function _calculateAge(string memory dob) internal view returns (uint64) {
        // Convert the date of birth (dob) string to a timestamp
        // Assuming the dob is in the format "YYYY-MM-DD"
        uint64 birthYear = _extractYear(dob);
        uint64 currentYear = _getCurrentYear();

        // Calculate age
        uint64 age = currentYear - birthYear;

        return age;
    }

    function _extractYear(string memory date) internal pure returns (uint64) {
        // Extract year from the date string
        // For simplicity, let's assume date is in the format "YYYY-MM-DD"
        // and year is the first 4 characters
        return uint64(_toUint(stringSlice(date, 0, 4)));
    }

    function _getCurrentYear() internal view returns (uint64) {
        // Placeholder function for getting the current year
        // You should implement actual logic to retrieve the current year from a reliable source
        return 2024; // Example placeholder value
    }

    function _toUint(string memory s) internal pure returns (uint64) {
        bytes memory b = bytes(s);
        uint64 number = 0;
        for (uint i = 0; i < b.length; i++) {
            number = number * 10 + (uint64(b[i]) - 48);
        }
        return number;
    }

    function stringSlice(string memory str, uint start, uint end) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(end - start);
        for (uint i = start; i < end; i++) {
            result[i - start] = strBytes[i];
        }
        return string(result);
    }
}
