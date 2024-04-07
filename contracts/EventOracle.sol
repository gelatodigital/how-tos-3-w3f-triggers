// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

contract EventOracle {
    uint256 public price;

    event GetPriceEvent();

    function getPrice() external {
        emit GetPriceEvent();
    }

    event PriceUpdated(uint256 indexed timeStamp, uint256 price);

    function updatePrice(uint256 _price) external {
        price = _price;

        emit PriceUpdated(block.timestamp, _price);
    }
}
