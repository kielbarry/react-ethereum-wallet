export function getPeerCount(w3) {
	console.log("inside", w3)
  w3.eth.net.getPeerCount().then((peerCount) => {
    console.log(peerCount)
  });
};

export async function checkNetwork(web3, cb) {
  return web3.eth.getBlock(0).then((block) => {
    switch (block.hash) {
      case '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3':
        return 'main';
        break;
      case '0x6341fd3daf94b748c72ced5a5b26028f2474f5f00d824504e4fa37a75767e177':
        return 'rinkeby';
        break;
      case '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d':
        return 'ropsten';
        break;
      case '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9':
        return 'kovan';
        break;
      default:
        return 'private';
    }
  }).then(resp => cb(resp));
};

export function nameProvider(prov) {
	switch(prov.constructor.name) {
		case 'MetamaskInpageProvider':
			return 'metamask';
			break;
		case 'WebsocketProvider':
			return 'geth';
			break;
		default:
			return 'unknown';
	}
}

export function getAccounts(web3, cb) {
	web3.eth.getAccounts().then(accounts => {
    accounts.map(acc => {
      let account = acc;
      web3.eth.getBalance(acc, (err, balance) => {
        cb({account, balance})
      })
    })
  })
}

export function getNewBlocks(web3, cb1, cb2) {
	web3.eth.subscribe('newBlockHeaders', (err, b) => {
    if(!err) {
      cb1({
        gasLimit: b.gasLimit,
        gasUsed: b.gasUsed,
        number: b.number,
        size: b.size,
        timestamp: b.timestamp
      })
      web3.eth.net.getPeerCount().then((peerCount) => cb2(peerCount));
    }
  });
}
