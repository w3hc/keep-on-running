export{}
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";


describe("DAO Contract", function () {

  async function deployContracts() {

    let [alice, bob, francis] = await ethers.getSigners()

    let signers:any = [alice.address, bob.address, francis.address]

    const uri = "ipfs://bafkreih2ac5yabo2daerkw5w5wcwdc7rveqejf4l645hx2px26r5fxfnpe"
    const firstMembers = signers
    const nftName = "Membership NFT"
    const symbol = "MEMBER"
    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(firstMembers, uri, nftName, symbol)

    const manifesto = "bafybeihprzyvilohv6zwyqiel7wt3dncpjqdsc6q7xfj3iuraoc7n552ya"
    const name = "Gov"
    const votingDelay = 1
    const votingPeriod = 300
    const votingThreshold = 1
    const quorum = 10
    const Gov = await ethers.getContractFactory("Gov")
    const gov = await Gov.deploy(
      await nft.getAddress(), 
      manifesto, 
      name, 
      votingDelay, 
      votingPeriod, 
      votingThreshold, 
      quorum
    )

    await nft.transferOwnership(await gov.getAddress())
    await nft.connect(alice).delegate(alice.address)
    await nft.connect(bob).delegate(alice.address)

    return { gov, nft, alice, bob }

  }

  describe("Deployment", function () {
    it("Should set the right DAO name", async function () {
      const { gov } = await loadFixture(deployContracts);
      expect(await gov.name()).to.be.equal("Gov")
    })
  });

  describe("Interactions", function () {
    it("Should submit a proposal", async function () {
      const { gov, nft, alice, bob } = await loadFixture(deployContracts);
      const nftAddress = await nft.getAddress()
      const addMemberCall = nft.interface.encodeFunctionData('safeMint', [bob.address, "abcd"])
      const calldatas = [addMemberCall.toString()]
      const targets = [nftAddress]
      const values = ["0"]
      const descriptionHash = ethers.keccak256(ethers.toUtf8Bytes("{ result: { kind: 'valid', asString: '# Simple proposal\n**It\'s simple.**' } }"))
      await expect( gov.connect(alice).propose(
        targets, 
        values, 
        calldatas, 
        descriptionHash
      )).to.be.fulfilled
    });
    it("Should mint 100 NFTs", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      await expect( nft.connect(alice).batchTransfer(100)).to.be.fulfilled
    });
  });
});

