export function getPeerCount(w3) {
	console.log("inside", w3)
  w3.eth.net.getPeerCount().then((peerCount) => {
    console.log(peerCount)
  });
};