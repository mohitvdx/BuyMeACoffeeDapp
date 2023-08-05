const hre = require("hardhat");

//Contract deployed to:  0x495200664Be66e79Cb0629913cd5DDa6edfFE57C

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


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }
    );
