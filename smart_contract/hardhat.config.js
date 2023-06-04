require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    Goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/MUs3eD31lg3fNnPJcQBQgMOo0NUTC0r7',
      accounts: ['f20379996faad3a0d0d825f8067bb349180aa891103d5dfec654319a3132ada5'],
    },
  },
};

