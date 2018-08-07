import React, { Component } from 'react';
import keyIndex from 'react-key-index';
import { connect } from 'react-redux';

import { updateCurrency } from '../../actions/actions.js';

import '../../stylesheets/mergedstyles.css';

class SelectableUnit extends Component {

  constructor(props) {
    super(props);
    this.unitSelected = this.unitSelected.bind(this);
  }

  unitSelected(e) {
    const newUnit = {CurrencyUnit: e.target.getAttribute('data-value').toUpperCase()}
    this.props.updateCurrency(newUnit)

  }

  render() {
    /**
		The available units

		@property selectableUnits
		*/
    var s = [
      {
        text: 'ETHER',
        value: 'ether'
      },
      {
        text: 'FINNEY', //(µΞ)
        value: 'finney'
      },
      {
        text: 'BTC',
        value: 'btc'
      },
      {
        text: 'USD',
        value: 'usd'
      },
      {
        text: 'EUR',
        value: 'eur'
      },
      {
        text: 'GBP',
        value: 'gbp'
      },
      {
        text: 'BRL',
        value: 'brl'
      }
    ];

    var selectableUnits = keyIndex(s, 1);

    return (
      
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
    );
  }
}

export default connect(null, { updateCurrency })(SelectableUnit);
