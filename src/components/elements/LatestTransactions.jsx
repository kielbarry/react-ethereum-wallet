import React, { Component } from 'react';

class LatestTransactions extends Component {
  render() {
    return (
      <React.Fragment>
        <h2>Latest transactions</h2>
        <br />
        <input type="text" className="filter-transactions" placeholder="Filter transactions" />
      </React.Fragment>
    );
  }
}

export default LatestTransactions


// <table className="dapp-zebra transactions">
//   <tbody>       
//     <tr className="" 
//     data-transaction-hash="0x145b42d746cf89b6dbe57d72d81455cb2ccbff1193a05ff75b3b3ecc7ff1b38a" 
//     data-block-hash="0xc0123f94d85af34cf5333f760260c867704da989b6f13829f39b77424c410f6e">
//         <td className="time simptip-position-right simptip-movable" data-tooltip="TBD">
//             <h2>May</h2>
//             <p>25</p>
//         </td>
//         <td className="account-name">
//           <h2>Sent</h2>
//           <p>
//             <span className="address dapp-shorten-text not-ens-name">
//                 <span className="dapp-identicon dapp-tiny" 
//                 title="This is a security icon.  If there were any change to the address, the resulting icon would be a completely different one">
//                   <img src={} className="identicon-pixel" />
//                 </span>
//                 <a href="/account/0x4decf83b51ec35775619f3aa446959ecb9236c62">Main account (Etherbase)</a>
//             </span>
//             <span className="arrow">→</span>      
//             <span className="address dapp-shorten-text not-ens-name">
//                 <span className="dapp-identicon dapp-tiny" 
//                 title="This is a security icon.  If there were any change to the address, the resulting icon would be a completely different one">
//                   <img src={}
//                   className="identicon-pixel" />
//                 </span>
//                 <a href={} 
//                 title="TBD"> TBD</a>
//             </span>
//           </p>
//         </td>
//         <td className="info">            
//         </td>  
//         <td className="transaction-amount minus">
//           -{ fee } ETHER
//         </td>
//         <td>
//             <i className="icon-arrow-right minus"></i>
//         </td>
//       </tr>            
//   </tbody>
// </table>