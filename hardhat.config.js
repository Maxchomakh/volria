require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const {
  SEPOLIA_RPC_URL,
  PRIVATE_KEY,
  MAINNET_RPC_URL,
  MAINNET_PRIVATE_KEY,
  ETHERSCAN_API_KEY,
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    // Réseau local lancé avec : npx hardhat node
    localhost: { url: "http://127.0.0.1:8545" },
    // Réseau de test public Sepolia (optionnel) — utilisé seulement si le fichier .env est rempli.
    // N'utilisez JAMAIS la clé d'un portefeuille qui contient de l'argent réel.
    ...(SEPOLIA_RPC_URL && PRIVATE_KEY
      ? { sepolia: { url: SEPOLIA_RPC_URL, accounts: [PRIVATE_KEY] } }
      : {}),
    // Réseau principal Ethereum (ARGENT RÉEL) — utilisé seulement si MAINNET_RPC_URL et MAINNET_PRIVATE_KEY sont remplis.
    // Utilisez un wallet dédié à Volria, avec seulement l'ETH nécessaire aux frais.
    ...(MAINNET_RPC_URL && MAINNET_PRIVATE_KEY
      ? { mainnet: { url: MAINNET_RPC_URL, accounts: [MAINNET_PRIVATE_KEY] } }
      : {}),
  },
  // Vérification du code sur Etherscan (npx hardhat verify ...)
  etherscan: {
    apiKey: ETHERSCAN_API_KEY || "",
  },
  sourcify: { enabled: false },
};
