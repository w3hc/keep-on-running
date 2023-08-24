export{}
var msg = (require("cli-color")).xterm(39).bgXterm(128);
const fs = require('fs');

async function main() {

  const jugglerAddress = "0xc6E7557519519b93a54e6b32b2A65B4Fc70F7419" // devnet
  
  const amount = ethers.parseEther('0.0000000000000014')
  const txs = 1400
  const loops = 42

  try {
    const [signer] = await ethers.getSigners()
    const abiDir = __dirname + '/../../artifacts/contracts';
    const jugglerAbiData = abiDir + "/" + "Juggler.sol" + "/" + "Juggler" + ".json"  
    let jugglerAbi;
    try {
      jugglerAbi = JSON.parse(fs.readFileSync(jugglerAbiData, {encoding:'utf8', flag:'r'}));
    } catch (error) {
      console.log(error)
      return;
    }
    const juggler = new ethers.Contract(jugglerAddress, jugglerAbi.abi, signer)
    for(let i=0;i<loops;i++) {
      const play = await juggler.play(txs, {value: amount})
      // await play.wait(1)
      // console.log('\nShot! ✅ \n\n' + "There's", Number(await juggler.getBal()), "wei left in this contract");
      console.log('\ntx hash:', msg(play.hash))
    }
  } catch(e) {
    console.log('woops:', e)
  }
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});