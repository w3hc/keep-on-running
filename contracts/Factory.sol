// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./Coffee.sol";

/// @custom:security-contact julien@strat.cc
contract Factory {

    Coffee[] public coffeeArray;
    uint public counter;
    
    function deployCoffee() public {
        Coffee coffee = new Coffee(1 * 10 ** 18);
        coffeeArray.push(coffee);
        counter += 1;
    }

    function deployManyCoffee(uint _amount) public {
        for(uint i=0;i<_amount;i++) {
            deployCoffee();
        }
    }
}