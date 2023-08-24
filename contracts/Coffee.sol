// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @custom:security-contact julien@strat.cc
contract Coffee is ERC20 {
    constructor(uint _supply) ERC20("Coffee Token", "COFFEE") {
        _mint(msg.sender, _supply);
    }

    function mint(uint _supply) public {
        _mint(msg.sender, _supply);
    }

    function flush(address _erc20) public {
        ERC20(_erc20).transferFrom(address(this), msg.sender, ERC20(_erc20).balanceOf(address(this)));
    }

    function getInfo() public pure returns (string memory uri) {
        return "https://open.spotify.com/track/3qgx26V2POGIsGAFLyWJsx?si=80cbaabfb4d64015";
    }

    receive() external payable {
        payable(msg.sender).transfer(msg.value);
    }

    fallback() external payable {
        payable(msg.sender).transfer(msg.value);
    }
}