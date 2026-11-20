// Déploie VolriaToken sur le réseau choisi (par défaut : réseau local Hardhat).
// Exemples :
//   npx hardhat run scripts/deploy.js --network localhost
//   npm run estimate:mainnet   -> affiche seulement le coût estimé, ne déploie rien
//   npm run deploy:mainnet     -> déploie réellement sur Ethereum (argent réel)
const { ethers, network } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const initialSupply = ethers.parseUnits(process.env.INITIAL_SUPPLY || "1000000", 18);

  console.log(`Réseau      : ${network.name}`);
  console.log(`Déployeur   : ${deployer.address}`);

  const Token = await ethers.getContractFactory("VolriaToken");

  if (network.name === "mainnet") {
    const balance = await ethers.provider.getBalance(deployer.address);
    const deployTx = await Token.getDeployTransaction(deployer.address, initialSupply);
    const gas = await ethers.provider.estimateGas({ ...deployTx, from: deployer.address });
    const fee = await ethers.provider.getFeeData();
    const price = fee.maxFeePerGas ?? fee.gasPrice;
    const cost = gas * price;

    console.log(`Solde       : ${ethers.formatEther(balance)} ETH`);
    console.log(`Gas estimé  : ${gas.toString()}`);
    console.log(`Prix du gas : ${ethers.formatUnits(price, "gwei")} gwei (maximum)`);
    console.log(`Coût max.   : ${ethers.formatEther(cost)} ETH`);

    if (balance < cost) {
      console.log("\nSolde insuffisant : ajoutez de l'ETH sur ce wallet avant de déployer.");
      process.exitCode = 1;
      return;
    }
    if (process.env.CONFIRM_MAINNET !== "OUI") {
      console.log("\nEstimation seulement : rien n'a été déployé.");
      console.log("Pour déployer réellement sur Ethereum : npm run deploy:mainnet");
      return;
    }
    console.log("\nDéploiement sur Ethereum MAINNET (argent réel)...");
  }

  const token = await Token.deploy(deployer.address, initialSupply);
  await token.waitForDeployment();

  console.log(`VolriaToken : ${await token.getAddress()}`);
  console.log(`Offre init. : ${ethers.formatUnits(initialSupply, 18)} VLR`);

  if (network.name === "sepolia" || network.name === "mainnet") {
    const verifyScript = network.name === "mainnet" ? "verify:mainnet" : "verify:sepolia";
    console.log("\nPour vérifier le contrat sur Etherscan (attendre ~1 minute) :");
    console.log(`npm run ${verifyScript} -- ${await token.getAddress()} ${deployer.address} ${initialSupply}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
