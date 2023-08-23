const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Incrementor", function () {

  async function deployContracts() {
    const [owner, alice, bob] = await ethers.getSigners();
    const Incrementor = await ethers.getContractFactory("Incrementor");
    const incrementor = await Incrementor.deploy(1);
    return { incrementor, owner, alice, bob };
  }

  describe("Deployment", function () {
    it("Should set the right initial value", async function () {
      const { incrementor } = await loadFixture(deployContracts);
      expect(await incrementor.x()).to.equal(1);
    });
  });

  describe("Interactions", function () {
    it("Should increment x", async function () {
      const { incrementor } = await loadFixture(deployContracts);
      await incrementor.increment()
      expect(await incrementor.x()).to.equal(2);
    });
  });
});