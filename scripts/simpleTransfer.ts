export{}
var msg = (require("cli-color")).xterm(39).bgXterm(128);
const fs = require('fs');
// import { loops } from '../loops'

const loops = 1

async function main() {

    try {

        /*

        - get the nonce of the account
        - increment the nonce
        - call sendTrasaction by passing the nonce

        no await 

        */

        let timestamp = Date.now()
        console.log("Started at", timestamp, "\n")

        const [account1] = await ethers.getSigners()

        // const random = Math.random()
        // console.log("random",random)

        for(let i=0;i<loops;i++) {

            const nonce = await ethers.provider.getTransactionCount(account1.address); 
            console.log("nonce:", nonce)

            const tx = await account1.sendTransaction({
                to: account1.address,
                value: 1,
                nonce: nonce
            });
            
            console.log(i+":", tx.hash)
        }

        let timestamp2 = Date.now()
        // console.log(timestamp2)
        console.log("\nIt took", (timestamp2 - timestamp)/1000, "seconds to make", loops, "simple transactions")

    
    } catch(e) {
        console.log('simpleTransfer error:', e)
    }
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});