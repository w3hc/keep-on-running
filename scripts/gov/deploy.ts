export{}
var msg = (require("cli-color")).xterm(39).bgXterm(128);

async function main() {

  const [bruce, vip1, vip2, vip3] = await ethers.getSigners()

  const uri = "ipfs://bafkreih2ac5yabo2daerkw5w5wcwdc7rveqejf4l645hx2px26r5fxfnpe"
  const firstMembers = [bruce, vip1, vip2, vip3]
  const nftName = "Membership NFT"
  const symbol = "MEMBER"
  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy(firstMembers, uri, nftName, symbol)
  const nftAddress = await nft.getAddress()

  console.log('\nNFT contract deployed at', msg(await nft.getAddress()),'\n');

  const manifesto = "bafybeihprzyvilohv6zwyqiel7wt3dncpjqdsc6q7xfj3iuraoc7n552ya"
  const name = "Gov"
  const votingDelay = 1
  const votingPeriod = 300
  const votingThreshold = 0
  const quorum = 10
  
  const Gov = await ethers.getContractFactory("Gov");
  const gov = await Gov.deploy(
    nftAddress, 
    manifesto, 
    name, 
    votingDelay, 
    votingPeriod, 
    votingThreshold, 
    quorum, {gasLimit: 420000} // for some reason I had to specify the gas limit here
  );
  await nft.transferOwnership(await gov.getAddress())
  console.log('\nGov contract deployed at', msg(await gov.getAddress()),'\n');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});