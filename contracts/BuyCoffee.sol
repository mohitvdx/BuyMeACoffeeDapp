// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BuyCoffee {

//event for each buy
event Buy(address buyer, 
            string name,
            uint amount,
            uint when,
            string message
    );

//owner of the contract
address payable public owner;

//struct for the memo
struct Memo {
    address buyer;
    string name;
    string message;
    uint amount;
    uint when;
}

//array of memo
Memo[] public memos;

//contructor for using the owner payable 
constructor() payable {
    owner = payable(msg.sender);
}

    //buycoffee function
    //description of the buyCoffee function
    /*
     * @dev Buy a coffee
     * @param buyer address of the buyer
     * @param amount amount of ether sent
     * @param when timestamp of the transaction
     */
    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value >= 0 ether, "You need to pay some ether to buy a coffee");
        //emit 
        emit Buy(msg.sender, _name, msg.value, block.timestamp, _message);
    //add in the array
    memos.push(Memo(msg.sender, _name, _message, msg.value, block.timestamp));
    }

    //withdraw the money function
    function withdraw() public {
        require(msg.sender == owner, "You are not the owner");
        owner.transfer(address(this).balance);

    }
    //function to get the balance of the contract
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    //function to view all the memos
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }
    }