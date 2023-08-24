var msg = (require("cli-color")).xterm(39).bgXterm(128);

async function deployCoffee() {

  const Coffee = await ethers.getContractFactory("Coffee");
  const coffee = await Coffee.deploy(ethers.parseEther('10000'));
  // await coffee.waitForDeployment();
  console.log('\nCoffee contract deployed at', msg(await coffee.getAddress()),'\n');
}

deployCoffee().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});