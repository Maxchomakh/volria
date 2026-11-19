const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("VolriaToken", function () {
  const INITIAL = ethers.parseUnits("1000000", 18); // 1 million de VLR de test
  const MAX = ethers.parseUnits("1000000000", 18);

  async function deployFixture() {
    const [owner, alice, bob] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("VolriaToken");
    const token = await Token.deploy(owner.address, INITIAL);
    return { token, owner, alice, bob };
  }

  describe("Déploiement", function () {
    it("a le bon nom, symbole et nombre de décimales", async function () {
      const { token } = await loadFixture(deployFixture);
      expect(await token.name()).to.equal("Volria");
      expect(await token.symbol()).to.equal("VLR");
      expect(await token.decimals()).to.equal(18n);
    });

    it("donne l'offre initiale au propriétaire", async function () {
      const { token, owner } = await loadFixture(deployFixture);
      expect(await token.balanceOf(owner.address)).to.equal(INITIAL);
      expect(await token.totalSupply()).to.equal(INITIAL);
    });

    it("fixe l'offre maximale à 1 milliard", async function () {
      const { token } = await loadFixture(deployFixture);
      expect(await token.cap()).to.equal(MAX);
      expect(await token.MAX_SUPPLY()).to.equal(MAX);
    });
  });

  describe("Transferts", function () {
    it("transfère des jetons entre deux comptes", async function () {
      const { token, owner, alice } = await loadFixture(deployFixture);
      const amount = ethers.parseUnits("100", 18);
      await expect(token.transfer(alice.address, amount)).to.changeTokenBalances(
        token,
        [owner, alice],
        [-amount, amount]
      );
    });

    it("refuse un transfert sans solde suffisant", async function () {
      const { token, alice, bob } = await loadFixture(deployFixture);
      await expect(
        token.connect(alice).transfer(bob.address, 1n)
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });
  });

  describe("Création (mint)", function () {
    it("permet au propriétaire de créer des jetons", async function () {
      const { token, alice } = await loadFixture(deployFixture);
      const amount = ethers.parseUnits("500", 18);
      await token.mint(alice.address, amount);
      expect(await token.balanceOf(alice.address)).to.equal(amount);
    });

    it("refuse le mint à un compte qui n'est pas propriétaire", async function () {
      const { token, alice } = await loadFixture(deployFixture);
      await expect(
        token.connect(alice).mint(alice.address, 1n)
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });

    it("refuse de dépasser l'offre maximale", async function () {
      const { token, owner } = await loadFixture(deployFixture);
      const rest = MAX - INITIAL;
      await token.mint(owner.address, rest); // atteint exactement 1 milliard
      await expect(
        token.mint(owner.address, 1n)
      ).to.be.revertedWithCustomError(token, "ERC20ExceededCap");
    });
  });

  describe("Destruction (burn)", function () {
    it("permet de détruire ses propres jetons", async function () {
      const { token, owner } = await loadFixture(deployFixture);
      const amount = ethers.parseUnits("10", 18);
      await token.burn(amount);
      expect(await token.totalSupply()).to.equal(INITIAL - amount);
      expect(await token.balanceOf(owner.address)).to.equal(INITIAL - amount);
    });
  });
});
