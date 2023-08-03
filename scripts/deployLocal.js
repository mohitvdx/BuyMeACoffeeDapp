// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

//function to get the balance of an account
async function getBalance(account) {
  const balance = await hre.ethers.provider.getBalance(account);
  return hre.ethers.utils.formatEther(balance);
}


async function printBalance(deployer, tipper, tipper2,tipper3,token) {
  console.log("Account balance of owner: ", await getBalance(deployer.address));
  console.log("Account balance of tipper1: ", await getBalance(tipper.address));
  console.log("Account balance of tipper2: ", await getBalance(tipper2.address));
  console.log("Account balance of tipper3: ", await getBalance(tipper3.address));
  console.log("Account balance of the smart contract", await getBalance(token.address));}

//function to print all the name and message of the tipper who tipped
function printAllBalances(memos) {
  console.log("All the tips received by the smart contract");
  for (let i = 0; i < memos.length; i++) {
    console.log("Name: ", memos[i].name);
    console.log("Message: ", memos[i].message);
  }
} 


async function main() {
  //get example account
  const [deployer,tipper, tipper2,tipper3] = await hre.ethers.getSigners();

    console.log("Deploying the contract with the account: ", deployer.address);
  //deploy the contract
    const Token = await hre.ethers.getContractFactory("BuyCoffee");
    const token = await Token.deploy();
    await token.deployed();
    console.log("Contract deployed to: ", token.address);
  

  //print balances before the tip
 await printBalance(deployer,tipper, tipper2,tipper3,token);

//do the tip
const tip = {value: hre.ethers.utils.parseEther("1.0")};
await token.connect(tipper).buyCoffee( "mohit","my first coffee" ,tip);
await token.connect(tipper2).buyCoffee( "rahul","great work" ,tip);


//print balances after the tip
await printBalance(deployer,tipper, tipper2,tipper3,token);

//withdraw the balance
await token.connect(deployer).withdraw();

//print balances after the withdraw
await printBalance(deployer,tipper, tipper2,tipper3,token);

const memos = token.getMemos();
  printAllBalances(memos);

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//price deducted is in the form of gas fee