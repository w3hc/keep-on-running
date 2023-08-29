# Keep On Running

Load testing Arthera Devnet.

- Network details: https://docs.arthera.net/validators/devnet#network-details 

## Install

```
npm ci
```

## Test

```
npm test
```

## Contracts

- Juggler: AA simple transfers
- Coffee: ERC-20 token
- Factory: contract factory
- Gov: NFT-based DAO contract

## Prepare

Create a `.env` file:

```
cp .env.template .env
```

In the `.env` file, add 10 private keys of funded accounts.

If needed, install `npm-run-all`: 

```
npm i npm-run-all -g
```

#### Create and fund wallets

If you need additional wallet accounts, you can use the `wallets.ts` scripts which creates and funds any newly created accounts from account #1. You can edit the `numberOfAccounts` variable, then run: 

```
npx hardhat run scripts/wallets.ts --network arthera-devnet
```

#### Check all balances

To check the balances of all the accounts: 

```
npx hardhat run scripts/balances.ts --network arthera-devnet
```

## Run

Set the number of loops in the `loops.ts` file, then run: 

```
./run.sh
```

or: 

```
npm-run-all -p juggler coffee factory gov gov2
```

#### Other commands

Juggler (AA simple transfers):

```
npx hardhat run scripts/juggler/deploy.ts --network arthera-devnet
npx hardhat run scripts/juggler/call.ts --network arthera-devnet
```

Coffee (ERC-20 contract):

```
npx hardhat run scripts/coffee/deploy.ts --network arthera-devnet
npx hardhat run scripts/coffee/call.ts --network arthera-devnet
```

Factory (contract factory): 

```
npx hardhat run scripts/factory/deploy.ts --network arthera-devnet
npx hardhat run scripts/factory/call.ts --network arthera-devnet
```

Gov (NFT-based DAO contract): 

```
npx hardhat run scripts/gov/deploy.ts --network arthera-devnet
npx hardhat run scripts/gov/call.ts --network arthera-devnet
```

Gov2 (NFT-based DAO contract): 

```
npx hardhat run scripts/gov2/deploy.ts --network arthera-devnet
npx hardhat run scripts/gov2/call.ts --network arthera-devnet
```

## Potential errors

If you get an `UNSUPPORTED_OPERATION` error, it means one of the accounts has run out of funds. 

## Versions

- Node [v20.5.1](https://nodejs.org/uk/blog/release/v20.5.1/)
- NPM [v9.8.0](https://github.com/npm/cli/releases/tag/v9.8.0)
- Hardhat [v2.17.0](https://github.com/NomicFoundation/hardhat/releases/tag/hardhat%402.17.0)
- OpenZeppelin Contracts [v4.9.2](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.9.2)

## Support

You can contact Julien via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discordapp.com/users/julienbrg), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).