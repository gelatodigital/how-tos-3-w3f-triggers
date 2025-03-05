// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EventOracle {
    uint256 public price;
    uint256 public updateCount;

    event GetPriceEvent();

    function getPrice() external {
        emit GetPriceEvent();
    }

    event PriceUpdated(uint256 indexed updateId, uint256 price);

    function updatePrice(uint256 _price) external {
        price = _price;
        updateCount++;
        
        emit PriceUpdated(updateCount, _price);
    }
}