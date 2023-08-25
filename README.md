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

- Juggler: simple transfers
- Coffee: ERC-20 token
- Factory: contract factory

## Prepare

Create a `.env` file:

```
cp .env.template .env
```

In the `.env` file, add 4 private keys of funded accounts.

If needed, install `npm-run-all`: 

```
npm i npm-run-all -g
```

## Run

Run in parallel: 

```
./run.sh
```

or: 

```
npm-run-all -p juggler coffee factory
```

Juggler:

```
npx hardhat run scripts/juggler/deploy.ts --network arthera-devnet
npx hardhat run scripts/juggler/call.ts --network arthera-devnet
```

Coffee (ERC-20):

```
npx hardhat run scripts/coffee/deploy.ts --network arthera-devnet
npx hardhat run scripts/coffee/call.ts --network arthera-devnet
```

Factory (contract factory): 

```
npx hardhat run scripts/factory/deploy.ts --network arthera-devnet
npx hardhat run scripts/factory/call.ts --network arthera-devnet
```

## Versions

- Node [v20.5.1](https://nodejs.org/uk/blog/release/v20.5.1/)
- NPM [v9.8.0](https://github.com/npm/cli/releases/tag/v9.8.0)
- Hardhat [v2.17.0](https://github.com/NomicFoundation/hardhat/releases/tag/hardhat%402.17.0)
- OpenZeppelin Contracts [v4.9.2](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.9.2)

## Support

You can contact Julien via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discordapp.com/users/julienbrg), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).