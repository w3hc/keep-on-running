export{}
var msg = (require("cli-color")).xterm(39).bgXterm(128);

async function main() {
    let accountsToCheck = []
    const [account1, account2, account3, account4, account5, account6, account7, account8, account9, account10] = await ethers.getSigners()
    accountsToCheck.push(account1, account2, account3, account4, account5, account6, account7, account8, account9, account10)
    console.log(" ")

    for (let i=0;i<10;i++) {
        const balance = await ethers.provider.getBalance(accountsToCheck[i].address)
        console.log("Balance of " + accountsToCheck[i].address + " is " + ethers.formatEther(balance) + " AA" )
    }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


