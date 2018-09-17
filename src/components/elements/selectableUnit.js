import React, { Component } from 'react';
import keyIndex from 'react-key-index';
import { connect } from 'react-redux';
// import onClickOutside from "react-onclickoutside";

import { updateCurrency } from '../../actions/actions.js';

import '../../stylesheets/mergedstyles.css';

class SelectableUnit extends Component {
  constructor(props) {
    super(props);
    this.unitSelected = this.unitSelected.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.unitSelected, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.unitSelected, false);
  }

  unitSelected(e) {
    if (this.node.contains(e.target)) {
      const newUnit = {
        CurrencyUnit: e.target.getAttribute('data-value').toUpperCase(),
      };
      this.props.updateCurrency(newUnit);
    }
  }

  render() {
    let selectableUnits = keyIndex(
      ['ether', 'finney', 'btc', 'usd', 'eur', 'gbp', 'brl'],
      1
    );
    let cn = require('classnames');
    let newClasses = cn({
      'simple-modal': true,
      animate: this.props.displaySU,
    });

    return (
      <div
        id="selectableUnitDrawer"
        className={newClasses}
        ref={node => (this.node = node)}
      >
        <ul>
          {selectableUnits.map(item => {
            return (
              <li key={item.id}>
                <button data-value={item.value} onClick={this.unitSelected}>
                  {item.value.toUpperCase()}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  null,
  { updateCurrency }
)(SelectableUnit);
