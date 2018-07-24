export const AccountPageHeader = [
  {text: "Accounts", strong: true},
  {text: " ", strong: false},
  {text: "Overiew", strong: false},
];

export const ContractPageHeader = [
  {text: "Contracts", strong: true},
];

export const SendPageHeader = [
  {text: "Send", strong: true},
  {text: " ", strong: false},
  {text: "funds", strong: false},
];

export const DefaultAccountList = [
  {
    title: 'Accounts',
    redirect: false,
    buttonClass: 'wallet-box create add-account',
    buttonDescription: 'ADD ACCOUNT',
    contractDescription:
      "Accounts are password protected keys that can hold Ether and Ethereum-based tokens. They can control contracts, but can't display incoming transactions."
  },
  {
    title: 'Wallet Contracts',
    redirect: true,
    link: 'account/new',
    buttonClass: 'wallet-box create ',
    buttonDescription: 'ADD WALLET CONTRACt',
    contractDescription:
      'These contracts are stored on the blockchain and can hold and secure Ether. They can have multiple accounts as owners and keep a full log of all transactions.'
  }
];


export const DefaultContractList = [
  {
    title: '',
    redirect: true,
    link: 'deploy-contract',
    buttonClass: 'wallet-box create add-contract',
    buttonDescription: 'DEPLOY NEW CONTRACT',
    contractDescription: ''
  },
  {
    title: 'Custom Contracts',
    redirect: false,
    link: 'deploy-contract',
    buttonClass: 'wallet-box create add-contract',
    buttonDescription: 'WATCH CONTRACT',
    contractDescription:
      'To watch and interact with a contract already deployed on the blockchain, you need to know its address and the description of its interface in JSON format.'
  },
  {
    title: 'Custom Tokens',
    redirect: false,
    link: 'deploy-contract',
    buttonClass: 'wallet-box create add-token',
    buttonDescription: 'DEPLOY NEW CONTRACT',
    contractDescription:
      'Tokens are currencies and other fungibles built on the Ethereum platform. In order for accounts to watch for tokens and send them, you have to add their address to this list. You can create your own token by simply modifying this example of a custom token contract or learning more about Ethereum Tokens.'
  }
];