# Keep On Running

Load testing Arthera Devnet.

- Network details: https://docs.arthera.net/validators/devnet#network-details 
- Song: https://open.spotify.com/track/3J9rILoQclpsyo71xhtqaE?si=db4c1853a010430a 

## Install

```
npm ci
```

## Test

```
npm test
```

## Deploy

Create a `.env` file:

```
cp .env.template .env
```

Add your own private key in the `.env` file, then: 

```
npx hardhat run scripts/deploy.ts --network arthera-devnet
```

Copy-paste your contract address in `call.ts`, then: 

```
npm run play
```

Alternatively, you can:

```
npx hardhat run scripts/call.ts --network arthera-devnet
```

## Versions

- Node [v20.5.1](https://nodejs.org/uk/blog/release/v20.5.1/)
- NPM [v9.8.0](https://github.com/npm/cli/releases/tag/v9.8.0)
- Hardhat [v2.17.0](https://github.com/NomicFoundation/hardhat/releases/tag/hardhat%402.17.0)
- OpenZeppelin Contracts [v4.9.2](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.9.2)

## Support

You can contact Julien via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discordapp.com/users/julienbrg), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).