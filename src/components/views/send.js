import React, { Component } from 'react';

import PageHeader from '../elements/PageHeaders.jsx';
import Slider from '../elements/Slider.jsx';
import TotalGas from '../elements/TotalGas.jsx';

//exp
import FormInput from '../elements/FormInput.jsx';
import LatestTransactions from '../elements/LatestTransactions.jsx';
import ShowMoreOptions from '../elements/ShowMoreOptions.jsx';

import { SendPageHeader } from '../../constants/FieldConstants.jsx';

class SendContractForm extends Component {
  constructor(props) {
    super(props);

    console.log(props)
  }

  render() {
    return (
      <form
        className="account-send-form"
        action="about:blank"
        target="dapp-form-helper-iframe"
        autoComplete="on"
      >
        <PageHeader title={SendPageHeader} />

        <FormInput />
        <LatestTransactions />
        {/*
        <ShowMoreOptions />
        */}
        <Slider />
        <TotalGas />

        <button type="submit" className="dapp-block-button">
          Send
        </button>
      </form>
    );
  }
}

export default SendContractForm;

// {{#if deployContract}}
//                     <h1>{ 'wallet.contracts.deployContract'}</h1>
//                 {{else}}
//                     <h1>{  'wallet.send.title' }</h1>
//                 {{/if}}

//                 {/* from/to */}
//                 <div class="row clear from-to">
//                     <div class="col col-6 mobile-full from">
//                         <h3>{{i18n 'wallet.send.from'}}</h3>

//                         {{> dapp_selectAccount accounts=(selectAccounts deployContract) showAccountTypes=true class='send-from'}}

//                     </div>

//                     <div class="col col-6 mobile-full">
//                         {{#unless deployContract}}
//                             <h3>{{i18n 'wallet.send.to'}}</h3>

//                             {{> dapp_addressInput placeholder="0x000000.." name="to" autofocus=true class="to"}}
//                         {{/unless}}
//                     </div>

//                     <div class="dapp-clear-fix"></div>
//                 </div>

//                 {{#with isVulnerable (TemplateVar.getFrom ".dapp-select-account" "value")}}
//                     {{#if vulnerabilities.txorigin}}
//                         {{> elements_vulnerabilities_txorigin}}
//                     {{/if}}
//                 {{/with}}

//                 {/* amount */}
//                 <div class="row clear">
//                     <div class="col col-6 mobile-full amount">
//                         <h3>{{i18n 'wallet.send.amount'}}</h3>
//                         {{#if TemplateVar.get "sendAll"}}
//                             {{#if $eq (TemplateVar.get "selectedToken") "ether"}}
//                                 <input type="text" name="amount" class="dapp-large" value="{{clearAmountFromChars (dapp_formatBalance sendAllAmount '0,0.[000000000000000000]')}}" disabled>
//                             {{else}}
//                                 <input type="text" name="amount" class="dapp-large" value="{{clearAmountFromChars (formatNumberByDecimals sendAllAmount tokenDecimals)}}" disabled>
//                             {{/if}}
//                         {{else}}
//                             <input type="text" min="0" step="any" name="amount" placeholder="0.0" class="dapp-large" pattern="[0-9\.,]*">
//                         {{/if}}

//                         <br>
//                         <label>
//                             <input type="checkbox" class="send-all">
//                             {{i18n 'wallet.send.sendAll'}}
//                         </label>

//                         <p class="send-info">
//                             {{#if $eq (TemplateVar.get "selectedToken") "ether"}}
//                                 {{#if isEtherUnit}}
//                                     {{{i18n 'wallet.send.texts.sendAmount' amount=(dapp_formatBalance (TemplateVar.get "amount") "0,0.[000000000000000000] UNIT" "ether")}}}
//                                 {{else}}
//                                     {{{i18n 'wallet.send.texts.sendAmountEquivalent' amount=(dapp_formatBalance (TemplateVar.get "amount") "0,0.[000000] UNIT") etherAmount=(dapp_formatBalance (TemplateVar.get "amount") "0,0.[000000000000000000] UNIT" "ether")}}}
//                                 {{/if}}
//                                 {{TemplateVar.get "dailyLimitText"}}
//                             {{else}}
//                                 {{sendExplanation}}
//                             {{/if}}
//                         </p>

//                     </div>

//                     <div class="col col-6 mobile-full">
//                         <br><br>

//                         {{#if hasTokens}}
//                             <ul class="select-token">
//                                 <li>
//                                     <input type="radio" id="ether" value="ether" name="choose-token" {{tokenSelectedAttr 'ether'}}>
//                                     <label for="ether">
//                                         <span class="ether-symbol">Ξ</span>
//                                         <span class="token-name">ETHER</span>
//                                         <span class="balance">
//                                             {{#if $neq unit 'ether'}}
//                                                 {{dapp_formatBalance selectedAccount.balance "0,0.00 UNIT"}} ({{dapp_formatBalance selectedAccount.balance "0,0.00[0000000000000000] UNIT" "ether"}})
//                                             {{else}}
//                                                 {{dapp_formatBalance selectedAccount.balance "0,0.00[0000000000000000] UNIT" "ether"}}
//                                             {{/if}}
//                                         </span>
//                                     </label>
//                                 </li>
//                                 {{#each tokens}}
//                                     {{#if formattedCoinBalance}}
//                                         <li>
//                                             <input type="radio" id="token-{{address}}" value="{{address}}"  name="choose-token" {{tokenSelectedAttr address}}>
//                                             <label for="token-{{address}}">
//                                                 {{> dapp_identicon identity=address class="dapp-tiny"}}
//                                                 <span class="token-name">{{name}}</span>
//                                                 <span class="balance">{{formattedCoinBalance}}</span>
//                                             </label>
//                                         </li>
//                                     {{/if}}
//                                 {{/each}}
//                             </ul>
//                         {{else}}
//                             <div class="token-ether">
//                                 <span class="ether-symbol">Ξ</span>
//                                 <span class="token-name">ETHER</span>
//                                 <span class="balance">
//                                     {{#if $neq unit 'ether'}}
//                                         {{dapp_formatBalance selectedAccount.balance "0,0.00 UNIT"}} ({{dapp_formatBalance selectedAccount.balance "0,0.00[0000000000000000] UNIT" "ether"}})
//                                     {{else}}
//                                         {{dapp_formatBalance selectedAccount.balance "0,0.00[0000000000000000] UNIT" "ether"}}
//                                     {{/if}}
//                                 </span>
//                             </div>
//                         {{/if}}
//                     </div>

//                     <div class="dapp-clear-fix"></div>
//                 </div>

//                 {{#if $eq (TemplateVar.get "selectedToken") "ether"}}
//                     {{> elements_compileContract onlyByteCode=showOnlyByteTextarea codeNotExecutable=(TemplateVar.get "codeNotExecutable")}}
//                 {{/if}}18
//                 <!-- Total -->
//                 <div class="row clear total">
//                     <div class="col col-12 mobile-full">
//                         <h3>{{i18n "commonWords.total"}}</h3>
//                         {{#if $eq (TemplateVar.get "selectedToken") "ether"}}
//                             <span class="amount">{{dapp_formatBalance total "0,0.00[0000000000000000] UNIT"}}</span>
//                             {{#if $neq unit 'ether'}}
//                                 <br>
//                                 ({{dapp_formatBalance total "0,0.00[0000000000000000] UNIT" "ether"}})
//                             {{/if}}
//                         {{else}}
//                             <span class="amount">{{tokenTotal}}</span> {{selectedToken.symbol}}
//                             <br>
//                             {{i18n "wallet.send.estimatedFee"}}: {{dapp_formatBalance total "0,0.00[000000] UNIT" "ether"}}
//                         {{/if}}

//                         {{#if selectedAccountIsWalletContract}}
//                             <br>
//                             {{i18n "wallet.send.texts.ownerPaysGas"}} ({{dapp_formatBalance (TemplateVar.getFrom ".dapp-select-gas-price" "gasInWei") "0,0.00[0000000000000000] UNIT" "ether"}})
//                         {{/if}}
//                     </div>

//                     <div class="dapp-clear-fix"></div>
//                 </div>

//                 <hr>

//                 <!-- a button type="submit" will send the form -->

//                 <button type="submit" class="dapp-block-button">
//                     {{#if TemplateVar.get "sending"}}
//                         {{i18n 'buttons.sending'}}
//                     {{else}}
//                         {{#if deployContract}}
//                             {{i18n 'wallet.app.buttons.deploy'}}
//                         {{else}}
//                             {{i18n 'buttons.send'}}
//                         {{/if}}
//                     {{/if}}
//                 </button>
