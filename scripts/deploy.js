const hre = require("hardhat");

async function main() {
    //get example account
    const [deployer,tipper, tipper2,tipper3] = await hre.ethers.getSigners();
  
      console.log("Deploying the contract with the account: ", deployer.address);
    //deploy the contract
      const Token = await hre.ethers.getContractFactory("BuyCoffee");
      const token = await Token.deploy();
      await token.deployed();
      console.log("Contract deployed to: ", token.address);
}
