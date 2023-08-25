export{}
var msg = (require("cli-color")).xterm(39).bgXterm(128);
const fs = require('fs');

async function main() {

  const govAddress = "0x771eB14E6B4317E96C5933016cc10bf499E49Ab7" // Replace contract address here if needed
  const nftAddress = "0x0aFcaB49Fe469b4614F9b99cE83E9568231137c5" // Replace contract address here if needed
  
  const amount = ethers.parseEther('1')
  const txs = 1
  const loops = 5

  try {
    const [bruce, vip1, vip2, vip3] = await ethers.getSigners()

    const abiDir = __dirname + '/../../artifacts/contracts';
    const nftAbiData = abiDir + "/" + "NFT.sol" + "/" + "NFT" + ".json"  
    let nftAbi;
    try {
      nftAbi = JSON.parse(fs.readFileSync(nftAbiData, {encoding:'utf8', flag:'r'}));
    } catch (error) {
      console.log(error)
      return;
    }
    const nft = new ethers.Contract(nftAddress, nftAbi.abi, vip3)

    const govAbiData = abiDir + "/" + "Gov.sol" + "/" + "Gov" + ".json"  
    let govAbi;
    try {
      govAbi = JSON.parse(fs.readFileSync(govAbiData, {encoding:'utf8', flag:'r'}));
    } catch (error) {
      console.log(error)
      return;
    }
    const gov = new ethers.Contract(govAddress, govAbi.abi, vip3)
    
    for(let i=0;i<loops;i++) {
      const addMemberCall = nft.interface.encodeFunctionData('safeMint', [bruce.address, "abcd"])
      const calldatas = [addMemberCall.toString()]
      const targets = [nftAddress]
      const values = ["0"]
      const descriptionHash = ethers.keccak256(ethers.toUtf8Bytes("{ result: { kind: 'valid', asString: '# Simple proposal\n**It\'s simple.**' } }"))
      const submitProposal = await gov.propose(
        targets, 
        values, 
        calldatas, 
        descriptionHash
      )
      console.log('\ntx hash:', msg(submitProposal.hash))
    }
  } catch(e) {
    console.log('woops:', e)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});