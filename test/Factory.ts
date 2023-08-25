export{}
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Contracts Factory", function () {

  async function deployContracts() {
    const [alice, bob] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("Factory")
    const factory = await Factory.deploy()
    return { factory, alice, bob }
  }

  describe("Deployment", function () {
    it("Should return 0", async function () {
      const { factory } = await loadFixture(deployContracts);
      expect(await factory.counter()).to.equal(0)
    });
  });

  describe("Interactions", function () {
    it("Should deploy 1 Coffee contract", async function () {
      const { factory } = await loadFixture(deployContracts);
      await factory.deployCoffee()
      expect(await factory.counter()).to.be.equal(1)
    });
    xit("Should deploy 10 Coffee contracts", async function () {
      const { factory } = await loadFixture(deployContracts);
      const amount = ethers.parseEther('1')
      const txs = 1
      for(let i=0;i<txs;i++) {
        await factory.deployManyCoffee(amount)
      }
      expect(await factory.counter()).to.be.equal(1)
    });
  });
});