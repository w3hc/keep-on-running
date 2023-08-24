export{}
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("ERC-20 transfers", function () {

  async function deployContracts() {
    const [alice, bob] = await ethers.getSigners();
    const initialBalance = ethers.parseEther('10000')
    const Coffee = await ethers.getContractFactory("Coffee")
    const coffee = await Coffee.deploy(initialBalance)
    return { coffee, alice, bob, initialBalance }
  }

  describe("Deployment", function () {
    it("Should return a balance of 10,000 units", async function () {
      const { coffee, initialBalance, alice } = await loadFixture(deployContracts);
      expect(await coffee.balanceOf(alice.address)).to.equal(initialBalance)
    });
  });

  describe("Interactions", function () {
    it("Should make 1 ERC-20 transfer", async function () {
      const { coffee, bob } = await loadFixture(deployContracts);
      const amount = ethers.parseEther('1')
      await coffee.transfer(bob.address, amount)
      expect(await coffee.balanceOf(bob.address)).to.be.equal(ethers.parseEther('1'))
    });
    it("Should make 100 ERC-20 transfers", async function () {
      const { coffee, bob } = await loadFixture(deployContracts);
      const amount = ethers.parseEther('1')
      const txs = 100
      for(let i=0;i<txs;i++) {
        await coffee.transfer(bob.address, amount)
      }
      expect(await coffee.balanceOf(bob.address)).to.be.equal(ethers.parseEther('100'))
    });
  });
});