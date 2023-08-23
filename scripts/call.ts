var msg = (require("cli-color")).xterm(39).bgXterm(128);
const fs = require('fs');

async function call() {

  // Replace with your own contract address, txs, amount, and loops
  const simpleTransfersAddress = "0xc6E7557519519b93a54e6b32b2A65B4Fc70F7419"
  const amount = ethers.parseEther('0.000000000000001')
  const txs = 1000
  const loops = 100

  try {
    const [signer] = await ethers.getSigners()
    const abiDir = __dirname + '/../artifacts/contracts';
    const simpleTransfersAbiData = abiDir + "/" + "SimpleTransfers.sol" + "/" + "SimpleTransfers" + ".json"  
    let simpleTransfersAbi;
    try {
      simpleTransfersAbi = JSON.parse(fs.readFileSync(simpleTransfersAbiData, {encoding:'utf8', flag:'r'}));
    } catch (error) {
      console.log(error)
      return;
    }
    const simpleTransfers = new ethers.Contract(simpleTransfersAddress, simpleTransfersAbi.abi, signer)
    for(let i=0;i<loops;i++) {
      const play = await simpleTransfers.play(txs, {value: amount})
      // await play.wait(1)
      // console.log('\nShot! ✅ \n\n' + "There's", Number(await simpleTransfers.getBal()), "wei left in this contract");
      console.log('\ntx hash:', msg(play.hash))
    }
  } catch(e) {
    console.log('woops:', e)
  }
  
}

call().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});