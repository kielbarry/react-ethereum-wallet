import React, { Component } from 'react';
import keyIndex from 'react-key-index';
import { connect } from 'react-redux';

import { updateCurrency } from '../../actions/actions.js';

import '../../stylesheets/mergedstyles.css';

class SelectableUnit extends Component {


  constructor(props) {
    super(props);
    this.state = { CurrencyUnit : 'ETHER' };
    this.unitSelected = this.unitSelected.bind(this);
  }

  unitSelected(e) {
    // this.setState({
    //   CurrencyUnit: e.target.getAttribute('data-value').toUpperCase()
    // });
    const newUnit = {CurrencyUnit: e.target.getAttribute('data-value').toUpperCase()}
    this.props.updateCurrency(newUnit)
    // this.props.updateCurrency(this.state)
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
      <div className="simple-modal">
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
