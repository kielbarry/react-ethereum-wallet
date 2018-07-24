import React, { Component } from 'react';

import InputItem from '../../elements/InputItem.jsx';

const listInputs = [
    {
        title: "Contract Address",
        divClass: "dapp-address-input",
        editor: "input",
        type: "text",
        name: "address",
        placeholder: "0x000000",
        className:"contract-address",
    },
    {
        title: "Contract name",
        divClass: "dapp-contract-name-input",
        editor: "input",
        type: "string",
        name: "contract-name",
        placeholder: "Name this contract",
        className:"name",
    },
    {
        title: "JSON Interface",
        divClass: "dapp-json-interface-input",
        editor: "textarea",
        type: "text",
        name: "jsonInterface",
        placeholder: "[{type: &quot;constructor&quot;, name: &quot;MyContract&quot;, &quot;inputs&quot;:[{&quot;name&quot;:&quot;_param1&quot;, &quot;type&quot;:&quot;address&quot;}]}, {...}]", 
        className:"jsonInterface",
        cols: "30",
        rows: "10",
    },
]

class WatchItem extends Component {
    render() {
        return (
            <div class="dapp-modal-overlay">
                <section class="dapp-modal-container modals-add-custom-contract">
                    <h1>Watch contract</h1>
                    
                    { listInputs.map(field => (<InputItem field={field} />)) }

                    <div class="dapp-modal-buttons">
                        <button class="cancel">Cancel</button>
                        <button class="ok dapp-primary-button">OK</button>
                    </div>
                  
                </section>
            </div>
        );
    }
}

export default WatchItem