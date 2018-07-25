import React, { Component } from 'react';

class LatestTransactions extends Component {
  render() {
    return (
      <React.Fragment>
        <h2>Latest transactions</h2>
        <br />
        <input type="text" class="filter-transactions" placeholder="Filter transactions" />
      </React.Fragment>
    );
  }
}

export default LatestTransactions


<table class="dapp-zebra transactions">
  <tbody>       
    <tr class="" 
    data-transaction-hash="0x145b42d746cf89b6dbe57d72d81455cb2ccbff1193a05ff75b3b3ecc7ff1b38a" 
    data-block-hash="0xc0123f94d85af34cf5333f760260c867704da989b6f13829f39b77424c410f6e">
        <td class="time simptip-position-right simptip-movable" data-tooltip={DateAndTIme}>
            <h2>May</h2>
            <p>25</p>
        </td>
        <td class="account-name">
          <h2>Sent</h2>
          <p>
            <span class="address dapp-shorten-text not-ens-name">
                <span class="dapp-identicon dapp-tiny" 
                title="This is a security icon.  If there were any change to the address, the resulting icon would be a completely different one">
                  <img src={} class="identicon-pixel" />
                </span>
                <a href="/account/0x4decf83b51ec35775619f3aa446959ecb9236c62">Main account (Etherbase)</a>
            </span>
            <span class="arrow">→</span>      
            <span class="address dapp-shorten-text not-ens-name">
                <span class="dapp-identicon dapp-tiny" 
                title="This is a security icon.  If there were any change to the address, the resulting icon would be a completely different one">
                  <img src={}
                  class="identicon-pixel" />
                </span>
                <a href={} 
                title="{ transactionId }">{ transactionId }</a>
            </span>
          </p>
        </td>
        <td class="info">            
        </td>  
        <td class="transaction-amount minus">
          -{ fee } ETHER
        </td>
        <td>
            <i class="icon-arrow-right minus"></i>
        </td>
      </tr>            
  </tbody>
</table>