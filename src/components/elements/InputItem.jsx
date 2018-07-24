import React, { Component } from 'react';

class InputItem extends Component {

    render() {
        return (
            
            <h3>Contract address</h3>
            <div class="dapp-address-input">
                <input type="text" name="address" placeholder="0x000000.." class="contract-address">
            </div>

            <h3>Contract name</h3>
            <input type="string" value="" name="name" placeholder="Name this contract" class="name">

            <h3>JSON Interface</h3>
            <textarea name="jsonInterface" class="jsonInterface" placeholder="[{type: &quot;constructor&quot;, name: &quot;MyContract&quot;, &quot;inputs&quot;:[{&quot;name&quot;:&quot;_param1&quot;, &quot;type&quot;:&quot;address&quot;}]}, {...}]" cols="30" rows="10"></textarea>

        );
    }
}

export default InputItem