// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint public x;

    constructor(uint _x) {
        x = _x;
    }

    function increment() public {
        x += 1;
    }
}
