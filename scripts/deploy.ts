const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128);

async function main() {

  const Incrementor = await ethers.getContractFactory("Incrementor");
  const incrementor = await Incrementor.deploy(0);
  await incrementor.waitForDeployment();

  console.log('\nIncrementor contract deployed at', msg(await incrementor.getAddress()));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});