export{}
var msg = (require("cli-color")).xterm(39).bgXterm(128);

async function main() {

  const Juggler = await ethers.getContractFactory("Juggler");
  const juggler = await Juggler.deploy({value: ethers.parseEther('0.000000000000001')});
  // await juggler.waitForDeployment();
  console.log('\nJuggler contract deployed at', msg(await juggler.getAddress()),'\n');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});