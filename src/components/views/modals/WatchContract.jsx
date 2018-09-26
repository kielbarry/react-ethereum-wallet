import React, { Component } from 'react';
import { connect } from 'react-redux';

// import InputItem from '../../elements/InputItem.jsx';
import TestInputItem from '../../elements/TestInputItem.jsx';
import * as Actions from '../../../actions/actions.js';

const listInputs = [
  {
    title: 'Contract Address',
    divClass: 'dapp-address-input',
    editor: 'input',
    type: 'text',
    name: 'address',
    placeholder: '0x000000',
    className: 'contract-address',
  },
  {
    title: 'Contract name',
    divClass: 'dapp-contract-name-input',
    editor: 'input',
    type: 'string',
    name: 'contract-name',
    placeholder: 'Name this contract',
    className: 'name',
  },
  {
    title: 'JSON Interface',
    divClass: 'dapp-json-interface-input',
    editor: 'textarea',
    type: 'text',
    name: 'jsonInterface',
    placeholder: `[{type: &quot;constructor&quot;, name: &quot;MyContract&quot;, &quot;inputs&quot;:[{"name&quot;:&quot;_param1&quot;, &quot;type&quot;:&quot;address&quot;}]}, {...}]`,
    className: 'jsonInterface',
    cols: '30',
    rows: '10',
  },
];

class WatchItem extends Component {
  constructor(props) {
    super(props);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.cancelFunction = this.cancelFunction.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.display !== prevProps.display) {
      return true;
    }
    return false;
  }

  handleOnKeyUp(e) {
    // TODO:validate inputs here
    this.props.updateContractToWatch({
      name: e.target.getAttribute('name'),
      value: e.target.value,
    });
  }

  cancelFunction(e) {
    this.props.cancelContractToWatch(); // TODO:reset data values in inputs
    this.props.closeModal('displayWatchContract');
  }

  submitFunction(e) {
    let EtherTankInfo = {
      address: '0x336db6c1ead9cc4d5b0a33ac03c057e20640126a',
      'contract-name': 'ethertank',
      jsonInterface: [
        {
          constant: false,
          inputs: [],
          name: 'FinishedExporting',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getCurrentPriceAuction',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getTankSell',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getTankName',
          outputs: [{ name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: '_tankID', type: 'uint32' },
            { name: '_upgradeChoice', type: 'uint8' },
          ],
          name: 'upgradeTank',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_tankID', type: 'uint32' }],
          name: 'cancelAuction',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'upgradePrice',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_hash', type: 'string' }],
          name: 'login',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_newMaster', type: 'address' }],
          name: 'ChangeAuctionMaster',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getCurrentPrice',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getTankDetails',
          outputs: [{ name: '', type: 'uint32[6]' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'newIdTankProduct',
          outputs: [{ name: '', type: 'uint32' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'UpgradeMaster',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'newIdTank',
          outputs: [{ name: '', type: 'uint32' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_tankID', type: 'uint32' }],
          name: 'bid',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getTankEarning',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_amount', type: 'uint256' }],
          name: 'cashOut',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: '_owner', type: 'address' },
            { name: '_tankproductID', type: 'uint32' },
          ],
          name: 'exportTank',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'canExport',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_tankproductID', type: 'uint32' }],
          name: 'buyTank',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'getContractBalance',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getTankAuctionEntity',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_newMaster', type: 'address' }],
          name: 'ChangeTankSellMaster',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_tankID', type: 'uint32' }],
          name: 'cashOutTank',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: '_tankID', type: 'uint32' },
            { name: '_receiver', type: 'address' },
          ],
          name: '_transfer',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getTankProduct',
          outputs: [{ name: '', type: 'uint32[6]' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getTankTotalEarned',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_newMaster', type: 'address' }],
          name: 'ChangeUpgradeMaster',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getTankOwner',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'createNewTankWeapon',
          outputs: [{ name: '', type: 'uint32' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'AuctionMaster',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: '_tankID', type: 'uint32' },
            { name: '_startPrice', type: 'uint256' },
            { name: '_finishPrice', type: 'uint256' },
            { name: '_duration', type: 'uint256' },
          ],
          name: 'sellTank',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'newIdTankWeapon',
          outputs: [{ name: '', type: 'uint32' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'tanksBeforeTheNewTankType',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'howManyTanks',
          outputs: [{ name: '', type: 'uint32' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_ID', type: 'uint32' }],
          name: 'getProductEarning',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_tankID', type: 'uint32' }],
          name: 'exportTankResetEarning',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: '_tankID', type: 'uint32' },
            { name: '_receiver', type: 'address' },
            { name: '_ActionType', type: 'uint8' },
          ],
          name: '_transferAction',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'ExportMaster',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'TankSellMaster',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'createNewTankHull',
          outputs: [{ name: '', type: 'uint32' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_player', type: 'address' }],
          name: 'getPlayerBalance',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'newIdAuctionEntity',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'newIdTankHull',
          outputs: [{ name: '', type: 'uint32' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'player', type: 'address' },
            { indexed: false, name: 'amount', type: 'uint256' },
          ],
          name: 'EventCashOut',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'player', type: 'address' },
            { indexed: false, name: 'hash', type: 'string' },
          ],
          name: 'EventLogin',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'player', type: 'address' },
            { indexed: false, name: 'tankID', type: 'uint32' },
            { indexed: false, name: 'upgradeChoice', type: 'uint8' },
          ],
          name: 'EventUpgradeTank',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'player', type: 'address' },
            { indexed: true, name: 'receiver', type: 'address' },
            { indexed: false, name: 'tankID', type: 'uint32' },
          ],
          name: 'EventTransfer',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'player', type: 'address' },
            { indexed: true, name: 'receiver', type: 'address' },
            { indexed: false, name: 'tankID', type: 'uint32' },
            { indexed: false, name: 'ActionType', type: 'uint8' },
          ],
          name: 'EventTransferAction',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'player', type: 'address' },
            { indexed: false, name: 'tankID', type: 'uint32' },
            { indexed: false, name: 'startPrice', type: 'uint256' },
            { indexed: false, name: 'finishPrice', type: 'uint256' },
            { indexed: false, name: 'duration', type: 'uint256' },
            { indexed: false, name: 'currentTime', type: 'uint256' },
          ],
          name: 'EventAuction',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: 'tankID', type: 'uint32' }],
          name: 'EventCancelAuction',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: 'tankID', type: 'uint32' }],
          name: 'EventBid',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: 'productID', type: 'uint32' },
            { indexed: false, name: 'name', type: 'string' },
            { indexed: false, name: 'hull', type: 'uint32' },
            { indexed: false, name: 'weapon', type: 'uint32' },
            { indexed: false, name: 'price', type: 'uint256' },
            { indexed: false, name: 'earning', type: 'uint256' },
            { indexed: false, name: 'releaseTime', type: 'uint256' },
            { indexed: false, name: 'currentTime', type: 'uint256' },
          ],
          name: 'EventProduct',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'player', type: 'address' },
            { indexed: false, name: 'productID', type: 'uint32' },
            { indexed: false, name: 'tankID', type: 'uint32' },
          ],
          name: 'EventBuyTank',
          type: 'event',
        },
      ],
    };
    // let token = 'https://etherscan.io/address/0xe41d2489571d322189246dafa5ebde1f4699f498#code'
    // let testcontract = 'https://etherscan.io/address/0x06012c8cf97bead5deae237070f9587f8e7a266d'
    let web3;
    let contract = this.props.reducers.ContractToWatch;

    contract = EtherTankInfo;

    console.log(contract);
    if (this.props.web3.web3Instance) {
      web3 = this.props.web3.web3Instance;
      let newContract = new web3.eth.Contract(
        contract.jsonInterface,
        contract.address
      );
      let con = {};
      con[contract['contract-name']] = contract;
      this.props.addObservedContract(con);
    } else {
      // TODO:trigger global notification here
    }
    this.props.closeModal('displayWatchContract');
  }

  // renderInputType(f){
  //   return (
  //     <React.Fragment>
  //       <h3>{f.title}</h3>
  //       <div className={f.divClass}>
  //         <input
  //           type={f.type}
  //           name={f.name}
  //           placeholder={f.placeholder}
  //           className={f.className}
  //           onKeyPress={(e)=>this.handleOnKeyUp(e)}
  //         />
  //       </div>
  //     </React.Fragment>
  //   )
  // }

  // renderTextAreaType(f){
  //   if (!f.cols) f.cols = 30;
  //   if (!f.rows) f.rows = 10;
  //   return (
  //     <React.Fragment>
  //       <h3>{f.title}</h3>
  //       <div className={f.divClass}>
  //         <input
  //           type={f.type}
  //           name={f.name}
  //           placeholder={f.placeholder}
  //           className={f.className}
  //           onKeyPress={(e)=>this.handleOnKeyUp(e)}
  //         />
  //       </div>
  //     </React.Fragment>
  //   );
  // }
  // renderInputItem(field, i) {
  //   // let field = this.props.field
  //   return (
  //     <div key={`contract-field-${i}`}>
  //       {
  //         field.editor === 'textarea'
  //           ? this.renderTextAreaType(field)
  //           : this.renderInputType(field)
  //       }
  //     </div>
  //   );
  // }

  render() {
    let divStyle;
    if (!this.props.display) divStyle = { display: 'none' };
    return (
      <div className={this.props.display} style={divStyle}>
        <section className="dapp-modal-container modals-add-custom-contract">
          <h1>Watch contract</h1>

          {listInputs.map((field, i) => (
            <TestInputItem
              key={`contract-field-${i}`}
              field={field}
              onKeyUp={e => this.handleOnKeyUp(e)}
            />
          ))}

          {/*
          {listInputs.map((field, i) => (
            this.renderInputItem(field, i)
            // <TestInputItem
            //   key={`contract-field-${i}`}
            //   field={field}
            //   onKeyPress={() => this.handleOnKeyUp()}
            // />
          ))}
          */}

          <div className="dapp-modal-buttons">
            <button className="cancel" onClick={() => this.cancelFunction()}>
              Cancel
            </button>
            <button
              className="ok dapp-primary-button"
              onClick={() => this.submitFunction()}
            >
              OK
            </button>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // return {modals: state.modals}
  return state;
};

export default connect(
  mapStateToProps,
  { ...Actions }
)(WatchItem);
