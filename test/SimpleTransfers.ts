const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Simple Transfers", function () {

  async function deployContracts() {
    const [owner, alice, bob] = await ethers.getSigners();
    const initialBalance = ethers.parseEther('1')
    const SimpleTransfers = await ethers.getContractFactory("SimpleTransfers")
    const simpleTransfers = await SimpleTransfers.deploy({value: initialBalance})
    return { simpleTransfers, owner, alice, bob, initialBalance }
  }

  describe("Deployment", function () {
    it("Should return a balance of 1 ETH", async function () {
      const { simpleTransfers, initialBalance } = await loadFixture(deployContracts);
      expect(await simpleTransfers.getBal()).to.equal(initialBalance)
    });
  });

  describe("Interactions", function () {
    it("Should make 1 simple transfer", async function () {
      const { simpleTransfers } = await loadFixture(deployContracts);
      const amount = ethers.parseEther('0.0000000000000001')
      const txs = 1
      await simpleTransfers.play(txs, {value: amount})
      expect(await simpleTransfers.getBal()).to.be.equal(ethers.parseEther('1.000000000000000099'))
    });
    it("Should make 1000 simple transfers", async function () {
      const { simpleTransfers } = await loadFixture(deployContracts);
      const amount = ethers.parseEther('0.0000000000000001')
      const txs = 1000
      await simpleTransfers.play(txs, {value: amount})
      expect(await simpleTransfers.getBal()).to.be.equal(ethers.parseEther('0.999999999999999100'))
    });
    it("Should transfer the whole contract balance to caller", async function () {
      const { simpleTransfers } = await loadFixture(deployContracts);
      const amount = 1000
      await simpleTransfers.flush()
      expect(await simpleTransfers.getBal()).to.be.equal(0)
    });
  });
});