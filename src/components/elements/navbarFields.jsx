import React, { Component } from 'react';
import SU from './selectableUnit.js';

export const HeaderField = ({ field }) => {


  return (
    <li className={field.liClass}>
      <a href={field.href}>
        <i className={field.icon} />
        <span>{field.displayText}</span>
      </a>
    </li>
  );
};

export const NetworkHeader = ({ field }) => {
  return (
    <li className={field.liClass}>
      <i className={field.firstIcon} />
      <span> {field.firstText} </span>
      <i className={field.secondIcon} />
      <span className={field.secondClass}>{field.secondText}</span>
    </li>
  );
};

export class BalanceHeader extends Component {
  render() {
    const field = this.props.field
    let currency = this.props.properties.currency

    return (
      <li className={field.liClass}>
        <h3>{field.firstText}</h3>
        <span className={field.firstClass}>
          "0.00"
          <span className="inline-form" name="unit">
            <button type="button" data-name="unit" data-value="ether">
              { currency }
            </button>
            <div className="simple-modal">
              <SU />
            </div>
          </span>
        </span>
      </li>
    );
  } 
}
