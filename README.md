# Arthera Hardhat Template

## Motivation

Facilitate the prototyping of decentralized apps to deploy to Arthera Testnet.

## Install

```
npm i
```

## Test

```
npx hardhat test
```

## Deploy

Create a `.env` file:

```
cp .env.example .env
```

Add your own private key in the `.env` file, then: 

```
npx hardhat run scripts/deploy.ts --network arthera-testnet
```

You can use the `increment.ts` script to increment the value of `x`: 

```
npx hardhat run scripts/increment.js --network arthera-testnet
```

## Contract verification

- Go to the [Arthera Testnet explorer](https://explorer-test.arthera.net/), which is a fork of Blockscout
- Paste you contract address
- Click on the 'contract' tab
- Click on the 'Verify and publish' button (top-right)
- Fill out the form and paste your Solidity code
- Click on 'Verify'

_Note: the Incrementor contract is [already verified](https://explorer-test.arthera.net/address/0x570DB771DeA83A2f6322E775886b0196cD770D7F?tab=contract) so you shouldn't need to do that if you keep it unchanged._

## Versions

- Node [v20.3.0](https://nodejs.org/uk/blog/release/v20.3.0/)
- NPM [v9.5.0](https://github.com/npm/cli/releases/tag/v9.5.0)
- Hardhat [v2.17.0](https://github.com/NomicFoundation/hardhat/releases/tag/hardhat%402.17.0)
- OpenZeppelin Contracts [v4.9.2](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.9.2)

## Support

You can contact Julien via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discordapp.com/users/julienbrg), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).