export{}
var msg = (require("cli-color")).xterm(39).bgXterm(128);

async function main() {

    const [account1] = await ethers.getSigners()

    // number of new accounts to create and fund from account #1
    const numberOfAccounts = 1

    for (let i=0;i<numberOfAccounts;i++) {
    
        ///// Create a new wallet /////

        const newAccount = ethers.Wallet.createRandom()

        console.log("\nPublic address: " + newAccount.address)
        console.log("\nPrivate key: " + msg(newAccount.privateKey))

        ///// Fund this new wallet /////

        const amount = ethers.parseEther("10.0")

        const fundWallet = await account1.sendTransaction({
            to: newAccount.address,
            value: amount
        });
    }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


