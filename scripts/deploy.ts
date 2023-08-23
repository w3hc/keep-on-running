var msg = (require("cli-color")).xterm(39).bgXterm(128);

async function deploy() {

  const SimpleTransfers = await ethers.getContractFactory("SimpleTransfers");
  const simpleTransfers = await SimpleTransfers.deploy({value: ethers.parseEther('0.000000000000001')});
  await simpleTransfers.waitForDeployment();

  console.log('\nSimpleTransfers contract deployed at', msg(await simpleTransfers.getAddress()),'\n');
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});