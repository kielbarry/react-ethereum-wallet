import React, { Component } from 'react';

// const tokenSummary = {
// 	tokenName: "",
// 	tokenBalance: "10.01",
// 	ethEquivalent: "2",
// 	currency: "GBP"
// }

// const EtherColumn = (tokenSummary) => {
// 	return (
// 		<div className="token-ether">
//             <span className="ether-symbol">Ξ</span>
//             <span className="token-name">ETHER</span>
//             <span className="balance">
//             	TBD
//             </span>
//         </div>
// 	);
// }

class FormInput extends Component {
  render() {
    return (
      <div className="col col-6 mobile-full from">
      {/*
	    <h3>From</h3>
	    <div className="dapp-select-account send-from">
		    <select name="dapp-select-account" className="send-from">
		    </select>

		    <span className="dapp-identicon dapp-small" style="background-image: url('data:image/png;base64,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')" title="This is a security icon.  If there were any change to the address, the resulting icon would be a completely different one">
		      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgElEQVR4Xu2bPQ4BURSFTaEVi7ACiV3YgERvBRqNaLQajd4SbEAtkdiJaBXs4H7FyctEfNrnvpm57/zMnHnTjV7rz6D47afzahjHNvcL/qfP43c2QARIATWgTxEihWwtwoqgLgAukEL0PRvTFOX48PYsx9P7DKQAnT1x1AaIAClALFIDqg4ogrpAYxs8Tq7lswD57G61jDieFm9P53IKsunOBogAKaAGVCqiCEKqqwv8ug1SIEIrTD5M9XQfkM5P9ZgH0AXQAajeBkAH0gZTvQhQAyAUJQ4TxKheDVAD6g6kCKP6WAQpsiKIp+MUu9sACExEQGqDUgBS25TjVK8GwKs3RVARrGPz2AUIYsThdJxuten8bEBqg9ThdIWpXgRAJkkLJAWkQONAhDicjqsBqQakr8fTFWxd33x/QOsLSOe3AfDFS7xDJF2h1vUiQATUH31Jgb+3wcPiUe4RoocJEhnK7EgEKXRNt/B0NkAESAE1oBIiRTDcja0L9PzRFAUmX9AdN782hSVwAAAAAElFTkSuQmCC" 
		      className="identicon-pixel" />
		    </span>
	    </div>
	*/}
	</div>
    );
  }
}

export default FormInput;
