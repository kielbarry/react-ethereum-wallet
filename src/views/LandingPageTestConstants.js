export const providerConstants = {
  Geth: {
    disabled: false,
    image: 'mist-150x150.png',
    link: 'https://github.com/ethereum/go-ethereum/releases',
  },
  Parity: {
    disabled: false,
    image: 'parity-signer.svg',
    link: 'https://github.com/paritytech/parity-ethereum/releases',
  },
  Metamask: {
    disabled: false,
    image: 'metamask-icon.svg',
    link: 'https://metamask.io/',
  },
  Infura: {
    disabled: false,
    image: 'infura-icon.jpeg',
    link: 'https://infura.io/',
  },
  Ganache: {
    disabled: false,
    image: 'ganache-icon.png',
    link: 'https://truffleframework.com/docs/ganache/quickstart',
  },
};

export const networks = {
  MainNet: {
    disabled: false,
    type: 'PoW',
  },
  Rinkeby: {
    set provider(prov) {
      this.selectedProvider = prov;
    },
    get disabled() {
      return this.selectedProvider === 'Parity';
    },
    type: 'PoA / Clique',
  },
  Ropsten: {
    disabled: false,
    type: 'PoW',
  },
  Kovan: {
    set provider(prov) {
      this.selectedProvider = prov;
    },
    get disabled() {
      return this.selectedProvider === 'Geth';
    },
    type: 'PoA / Clique',
  },
  Sokol: {
    set provider(prov) {
      this.selectedProvider = prov;
    },
    get disabled() {
      return this.selectedProvider !== 'Parity';
    },
    type: 'PoA / Clique',
  },
  Görli: {
    set provider(prov) {
      this.selectedProvider = prov;
    },
    get disabled() {
      return this.selectedProvider !== 'Parity';
    },
    type: 'PoA / Clique',
  },
  INFURAnet: {
    set provider(prov) {
      this.selectedProvider = prov;
    },
    get disabled() {
      return this.selectedProvider !== 'Infura';
    },
    type: 'PoA / Clique',
  },
};
