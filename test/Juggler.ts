const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Simple ETH transfers", function () {

  async function deployContracts() {
    const [owner, alice, bob] = await ethers.getSigners();
    const initialBalance = ethers.parseEther('1')
    const Juggler = await ethers.getContractFactory("Juggler")
    const juggler = await Juggler.deploy({value: initialBalance})
    return { juggler, owner, alice, bob, initialBalance }
  }

  describe("Deployment", function () {
    it("Should return a balance of 1 ETH", async function () {
      const { juggler, initialBalance } = await loadFixture(deployContracts);
      expect(await juggler.getBal()).to.equal(initialBalance)
    });
  });

  describe("Interactions", function () {
    it("Should make 1 simple transfer", async function () {
      const { juggler } = await loadFixture(deployContracts);
      const amount = ethers.parseEther('0.0000000000000001')
      const txs = 1
      await juggler.play(txs, {value: amount})
      expect(await juggler.getBal()).to.be.equal(ethers.parseEther('1.000000000000000099'))
    });
    it("Should make 1000 simple transfers", async function () {
      const { juggler } = await loadFixture(deployContracts);
      const amount = ethers.parseEther('0.0000000000000001')
      const txs = 1000
      await juggler.play(txs, {value: amount})
      expect(await juggler.getBal()).to.be.equal(ethers.parseEther('0.999999999999999100'))
    });
    it("Should transfer the whole contract balance to caller", async function () {
      const { juggler } = await loadFixture(deployContracts);
      const amount = 1000
      await juggler.flush()
      expect(await juggler.getBal()).to.be.equal(0)
    });
  });
});