import React from 'react';

const InputType = ({ f }) => {
  return (
    <React.Fragment>
      <h3>{f.title}</h3>
      <div className={f.divClass}>
        <input
          type={f.type}
          name={f.name}
          placeholder={f.placeholder}
          className={f.className}
          onKeyPress={e => this.props.onKeyPress(e)}
        />
      </div>
    </React.Fragment>
  );
};

const TextAreaType = ({ f }) => {
  if (!f.cols) f.cols = 30;
  if (!f.rows) f.rows = 10;
  console.log(this);
  return (
    <React.Fragment>
      <h3>{f.title}</h3>
      <div className={f.divClass}>
        <textarea
          name={f.name}
          className={f.className}
          placeholder={f.placeholder}
          cols={f.cols}
          rows={f.rows}
          onKeyPress={e => this.props.onKeyPress(e)}
        />
      </div>
    </React.Fragment>
  );
};

export const InputItem = ({ field }) => {
  console.log(this);
  return (
    <React.Fragment>
      {field.editor === 'textarea' ? (
        <TextAreaType f={field} />
      ) : (
        <InputType f={field} />
      )}
    </React.Fragment>
  );
};

export default InputItem;
