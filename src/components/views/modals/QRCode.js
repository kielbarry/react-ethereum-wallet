import React, { Component } from 'react';
// import EthereumQRPlugin from 'ethereum-qr-code'

class QRCode extends Component {
  // constructor(props){
  // 	super(props)
  // }
  render() {
    // qr.toAddressString({
    //   to: '0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8',
    //   value: 100,
    // })
    // const qr = new EthereumQRPlugin()
    // const qrCode = qr.toCanvas({
    // 	  to: '0x6a6964034c192ccaa8594a179db7a98ad581e4f2',
    // 	  gas: 21000,
    // 	}, {
    // 	  selector: 'my-qr-code',
    // 	})
    // console.log(qr)

    return (
      <React.Fragment>
        <canvas id="my-qr-code" />
        <div id="my-qr-code" />
      </React.Fragment>
    );
  }
}

export default QRCode;
