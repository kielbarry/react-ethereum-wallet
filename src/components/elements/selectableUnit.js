import React, { Component } from 'react';
import keyIndex from 'react-key-index';
import { connect } from 'react-redux';
import onClickOutside from "react-onclickoutside";

import { updateCurrency } from '../../actions/actions.js';

import '../../stylesheets/mergedstyles.css';

class SelectableUnit extends Component {

  constructor(props) {
    super(props);
    const node = this.mainDivRef = React.createRef();
    this.unitSelected = this.unitSelected.bind(this);
  }

  componentWillMount(){
    document.addEventListener('mousedown', this.unitSelected, false)
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.unitSelected, false)
  }

  componentDidUpdate(prevProps, prevState) {
  }

  unitSelected(e) {
     if(this.node.contains(e.target)) {
       const newUnit = {CurrencyUnit: e.target.getAttribute('data-value').toUpperCase()}
       this.props.updateCurrency(newUnit)
    }
  }

  render() {
    /**
		The available units

		@property selectableUnits
		*/
    var s = [
      {text: 'ETHER', value: 'ether'},
      {text: 'FINNEY', //(µΞ)
      value: 'finney'},
      {text: 'BTC', value: 'btc'},
      {text: 'USD', value: 'usd'},
      {text: 'EUR', value: 'eur'},
      {text: 'GBP', value: 'gbp'},
      {text: 'BRL', value: 'brl'}
    ];

    var selectableUnits = keyIndex(s, 1);

    var cn = require('classnames');
    var newClasses = cn({
      'simple-modal': true,
      'animate': this.props.displaySU,
    });

    return (
      <div id="selectableUnitDrawer" className={ newClasses } ref={ node=> this.node = node }>
        <ul>
          {Object.keys(selectableUnits).map((item, i) => {
            const s = selectableUnits[item];
            const t = s.text;
            const v = s.value;
            return (
              <li key={s._textId}>
                <button key={s._valueId} data-value={v} onClick={ this.unitSelected }>
                  {t}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(null, { updateCurrency })(SelectableUnit);
