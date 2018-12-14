import { WalletInterfaceItems } from '../constants/InitConstants';

export function initWalletContact(web3) {
  return new web3.eth.Contract(WalletInterfaceItems.walletInterface);
}

/**
Replaces the address in the stub code "walletStubABI" variable.

@method replaceStubAddress
*/
export function replaceStubAddress(address) {
  // set this address as used address
  // let originalContractAddress = address;
  return WalletInterfaceItems.walletStubABI.replace(
    'cafecafecafecafecafecafecafecafecafecafe',
    address.replace('0x', '')
  );
}

/**
Deploys testnet wallet, when on other orig wallet was found

@method deployTestnetWallet
*/
// TODO
export function deployTestnetWallet(web3) {
  // let account = web3.eth.accounts[0];
}

/**
Checks the main and testnet address

@method checkCodeOnAddress
*/
export function checkCodeOnAddress(web3, address, cb) {
  web3.eth
    .getCode(address)
    .then(code => {
      console.log(code);
      if (code.length > 2) {
        this.replaceStubAddress(address);
        if (address === WalletInterfaceItems.mainNetAddress) {
          console.log(
            'Use Main-net wallet as code base for stubs on address: ',
            address
          );
        }
        if (address === WalletInterfaceItems.testNetAddress) {
          console.log(
            'Use Test-net wallet as code base for stubs on address: ',
            address
          );
        }
      }
    })
    .catch(err => {
      return {
        err: true,
        details: { content: err, duration: 8, type: 'warning' },
      };
    });
}

/**
Checks if the original wallet exists, if not deploys it

@method checkForOriginalWallet
*/
// TODO
export function checkForOriginalWallet() {}

/**
Check wallet owners

@method checkWalletOwners
*/
// TODO
export function checkWalletOwners(address, web3, contract) {
  // let owners = new Promise((resolve, reject) => {
  // 	let returnValue = { owners: false, info: '' };
  // 	if(web3.utils.isAddress(address)) {
  // 		contract.options.address = address.toLowerCase();
  // 		contract.m_numOwners()
  // 			.then(numberOfOwners => {
  // 				let num = numberOfOwners.toNumber();
  // 				if(!(num > 0)) resolve(returnValue);
  // 			})
  // 			.catch(err => reject(err))
  // 	}
  // })
}
