// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CounterAutomate {
    uint256 public count;

    event CounterIncremented(uint256 newCount);

    constructor() {
        count = 0;
    }

    function increment() public {
        count += 1;
        emit CounterIncremented(count);
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}