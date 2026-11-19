// Déploie VolriaToken sur le réseau choisi (par défaut : réseau local Hardhat).
// Exemple : npx hardhat run scripts/deploy.js --network localhost
const { ethers, network } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const initialSupply = ethers.parseUnits(process.env.INITIAL_SUPPLY || "1000000", 18);

  console.log(`Réseau      : ${network.name}`);
  console.log(`Déployeur   : ${deployer.address}`);

  const Token = await ethers.getContractFactory("VolriaToken");
  const token = await Token.deploy(deployer.address, initialSupply);
  await token.waitForDeployment();

  console.log(`VolriaToken : ${await token.getAddress()}`);
  console.log(`Offre init. : ${ethers.formatUnits(initialSupply, 18)} VLR`);

  if (network.name === "sepolia") {
    console.log("\nPour vérifier le contrat sur Etherscan (attendre ~1 minute) :");
    console.log(`npm run verify:sepolia -- ${await token.getAddress()} ${deployer.address} ${initialSupply}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
