// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Juggler {

    constructor() payable {}

    function play(uint _txs) public payable {
        payable(address(this)).transfer(msg.value);
        for (uint i = 0 ; i < _txs ; i++) {
            payable(msg.sender).transfer(1);
        }
    }

    function flush() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    function getBal() public view returns (uint contractBal) {
        return address(this).balance;
    }

    receive() external payable {}
    fallback() external payable {}
}
