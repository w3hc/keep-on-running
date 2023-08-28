export{}
var msg = (require("cli-color")).xterm(39).bgXterm(128);
const fs = require('fs');
import { loops } from '../loops'

async function main() {

  const govAddress = "0xffe6A68Afb5B84C53d50E3ABdC9e5A50f53C202d" // Replace contract address here if needed
  const nftAddress = "0x8810C6B3b894B58c8D5Cecd42A1bAff65019e7ec" // Replace contract address here if needed
  
  const amount = ethers.parseEther('1')
  const txs = 1

  try {
    const [account1, account2, account3, account4, account5, account6, account7, account8, account9, account10] = await ethers.getSigners()

    // console.log('bal: ', Number(await ethers.provider.getBalance(account5.address)))

    const abiDir = __dirname + '/../../artifacts/contracts';
    const nftAbiData = abiDir + "/" + "NFT.sol" + "/" + "NFT" + ".json"  
    let nftAbi;
    try {
      nftAbi = JSON.parse(fs.readFileSync(nftAbiData, {encoding:'utf8', flag:'r'}));
    } catch (error) {
      console.log(error)
      return;
    }
    const nft = new ethers.Contract(nftAddress, nftAbi.abi, account5)

    const govAbiData = abiDir + "/" + "Gov.sol" + "/" + "Gov" + ".json"  
    let govAbi;
    try {
      govAbi = JSON.parse(fs.readFileSync(govAbiData, {encoding:'utf8', flag:'r'}));
    } catch (error) {
      console.log(error)
      return;
    }
    const gov = new ethers.Contract(govAddress, govAbi.abi, account5)
    
    for(let i=0;i<loops;i++) {
      const addMemberCall = nft.interface.encodeFunctionData('safeMint', [account1.address, "abcd"])
      const calldatas = [addMemberCall.toString()]
      const targets = [nftAddress]
      const values = ["0"]
      const descriptionHash = ethers.keccak256(ethers.toUtf8Bytes("{ result: { kind: 'valid', asString: '# Simple proposal\n**It\'s simple.**' } }"))
      const submitProposal = await gov.propose(
        targets, 
        values, 
        calldatas, 
        descriptionHash, {gasLimit: 30000} // had to specify the ges llimit for some reason
      )
      console.log('\npropose:', msg(submitProposal.hash))
    }

    for(let i=0;i<loops;i++) {
      const mint = await nft.batchTransfer(txs)
      console.log('\nmint:', msg(mint.hash))
      const batchMint = await nft.safeMint("0x933562029fb046A72851F72a44309B7D51fF5946", "Keep on running")
      console.log('\nbatchMint:', msg(batchMint.hash))
    }
  } catch(e) {
    console.log('woops:', e)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});