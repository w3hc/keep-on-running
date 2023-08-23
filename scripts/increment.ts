const fs = require('fs');
const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128);

async function main() {

  // Replace with your own contract address
  const incrementorAddress = "0x6d644EAa16701c421D2ADD78679edF0Bb5eF1A24"

  const [signer] = await ethers.getSigners()
  const abiDir = __dirname + '/../artifacts/contracts';
  const incrementorAbiContract = abiDir + "/" + "Incrementor.sol" + "/" + "Incrementor" + ".json"  
  let incrementorAbi;
  try {
    incrementorAbi = JSON.parse(fs.readFileSync(incrementorAbiContract,{encoding:'utf8', flag:'r'}));
  } catch (error) {
    console.log(error)
    return;
  }
  const incrementor = new ethers.Contract(incrementorAddress, incrementorAbi.abi, signer)
  console.log('\n\nPrevious value:', Number(await incrementor.x()))
  const plusOne = await incrementor.increment()
  await plusOne.wait(1)
  console.log('\nIncremented. ✅ \n\nThe new value of x is', Number(await incrementor.x()), '\n\nTx hash:', msg(plusOne.hash));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});