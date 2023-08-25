export{}
var msg = (require("cli-color")).xterm(39).bgXterm(128);
const fs = require('fs');

async function main() {

  const factoryAddress = "0xBbEc7b30593579684771dFe43667efa0a1Cc8Da9" // Replace contract address here if needed
  const loops = 5
  const txs = 5

  try {
    const [bruce, vip1, vip2, vip3] = await ethers.getSigners()
    const abiDir = __dirname + '/../../artifacts/contracts';
    const factoryAbiData = abiDir + "/" + "Factory.sol" + "/" + "Factory" + ".json"  
    let factoryAbi;
    try {
      factoryAbi = JSON.parse(fs.readFileSync(factoryAbiData, {encoding:'utf8', flag:'r'}));
    } catch (error) {
      console.log(error)
      return;
    }
    const factory = new ethers.Contract(factoryAddress, factoryAbi.abi, vip2)
    for(let i=0;i<loops;i++) {
      // const play = await factory.deployCoffee()
      // console.log('\ntx hash:', msg(play.hash))
      const play2 = await factory.deployManyCoffee(txs)
      console.log('\ntx hash:', msg(play2.hash))
    }
    console.log('\nTotal contracts deployed:', Number(await factory.counter()))
  } catch(e) {
    console.log('woops:', e)
  }
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});