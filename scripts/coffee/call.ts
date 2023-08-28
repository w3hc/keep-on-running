export{}
var msg = (require("cli-color")).xterm(39).bgXterm(128);
const fs = require('fs');
import { loops } from '../loops'

async function main() {

  const coffeeAddress = "0x419e6485325eE6a0103e643b8226eB1d266C35bb" // Replace contract address here if needed
  const amount = ethers.parseEther('1')
  const txs = 1400

  try {
    const [account1, account2, account3, account4, account5, account6, account7, account8, account9, account10] = await ethers.getSigners()
    const abiDir = __dirname + '/../../artifacts/contracts';
    const coffeeAbiData = abiDir + "/" + "Coffee.sol" + "/" + "Coffee" + ".json"  
    let coffeeAbi;
    try {
      coffeeAbi = JSON.parse(fs.readFileSync(coffeeAbiData, {encoding:'utf8', flag:'r'}));
    } catch (error) {
      console.log(error)
      return;
    }
    const coffee = new ethers.Contract(coffeeAddress, coffeeAbi.abi, account2)
    for(let i=0;i<loops;i++) {
      const play = await coffee.mint(amount)
      // await play.wait(1)
      // console.log('\nShot! ✅ \n\n' + "There's", Number(await juggler.getBal()), "wei left in this contract");
      console.log('\nmint:', msg(play.hash))
    }
  } catch(e) {
    console.log('woops:', e)
  }
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});