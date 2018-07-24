import React from 'react';

const RedirectButton = ({ f }) => {
  return (
    <a href={f.link} className={f.buttonClass}>
      <div className="account-pattern">+</div>
      <h3>{f.buttonDescription}</h3>
    </a>
  );
};

const ActionButton = ({ f }) => {
  return (
    <React.Fragment>
      <h2>{f.title}</h2>
      <p>{f.contractDescription}</p>
      <div className="dapp-clear-fix" />
      <div className="wallet-box-list" />
      <button className={f.buttonClass}>
        <div className="account-pattern">+</div>
        <h3>{f.buttonDescription}</h3>
      </button>
      <div className="dapp-clear-fix" />
    </React.Fragment>
  );
};

const AddForm = ({ field }) => {
  return (
    <React.Fragment>
      {field.redirect ? (
        <RedirectButton f={field} />
      ) : (
        <ActionButton f={field} />
      )}
    </React.Fragment>
  );
};

export default AddForm;
