import React, { Component } from 'react';
import { connect } from 'react-redux';
// import onClickOutside from "react-onclickoutside";
import shortid from 'shortid';

import { updateCurrency } from '../../actions/actions.js';

import '../../stylesheets/mergedstyles.css';

const selectableUnits = ['ether', 'finney', 'btc', 'usd', 'eur', 'gbp', 'brl'];

class SelectableUnit extends Component {
  constructor(props) {
    super(props);
    this.unitSelected = this.unitSelected.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.setState({ displaySU: false });
    document.addEventListener('mousedown', this.unitSelected, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.unitSelected, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.displaySU !== prevState.displaySU) {
      this.setState({ displaySU: !this.props.displaySU });
    }
  }

  unitSelected(e) {
    if (this.node.contains(e.target)) {
      const newUnit = {
        CurrencyUnit: e.target.getAttribute('data-value').toUpperCase(),
      };
      this.props.updateCurrency(newUnit);
    }
  }

  renderList() {
    return (
      <React.Fragment>
        {selectableUnits.map(item => (
          <li key={shortid.generate()}>
            <button data-value={item} onClick={this.unitSelected}>
              {item.toUpperCase()}
            </button>
          </li>
        ))}
      </React.Fragment>
    );
  }

  render() {
    let cn = require('classnames');
    let newClasses = cn({
      'simple-modal': true,
      animate: this.state.displaySU,
    });
    return (
      <div
        id="selectableUnitDrawer"
        className={newClasses}
        ref={node => (this.node = node)}
      >
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

export default connect(
  null,
  { updateCurrency }
)(SelectableUnit);
