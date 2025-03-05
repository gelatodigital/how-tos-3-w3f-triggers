// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Interface for the Counter contract
interface ICounter {
    // Function to increase the count by a specified amount
    function increaseCount(uint256 amount) external;

    // Function to get the timestamp of the last execution
    function lastExecuted() external view returns (uint256);
}

// Disable Solidity linting rule for not relying on block timestamp for non-critical operations
// solhint-disable not-rely-on-time
contract CounterResolverWT {
    // Immutable variable to store the address of the Counter contract
    ICounter public immutable counter;

    // Constructor to initialize the Counter contract address
    constructor(ICounter _counter) {
        counter = _counter;
    }

    // Function to check if the increaseCount function can be executed and prepare the payload
    function checker()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        // Get the timestamp of the last execution from the Counter contract
        uint256 lastExecuted = counter.lastExecuted();

        // Determine if more than 180 seconds have passed since the last execution
        canExec = (block.timestamp - lastExecuted) > 180;

        // Prepare the function call payload for increaseCount(1)
        execPayload = abi.encodeCall(ICounter.increaseCount, (1));
    }
}