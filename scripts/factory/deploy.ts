var msg = (require("cli-color")).xterm(39).bgXterm(128);

async function main() {

  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  // await coffee.waitForDeployment();
  console.log('\nFactory contract deployed at', msg(await factory.getAddress()),'\n');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});