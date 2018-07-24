import React from 'react';

const InputType = ({ f }) => {
  return (
    <React.Fragment>
      <h3>{f.title}</h3>
      <div class={f.divClass}>
        <input
          type={f.type}
          name={f.name}
          placeholder={f.placeholder}
          className={f.className}
        />
      </div>
    </React.Fragment>
  );
};

const TextAreaType = ({ f }) => {
  if (!f.cols) f.cols = 30;
  if (!f.rows) f.rows = 10;
  return (
    <React.Fragment>
      <h3>{f.title}</h3>
      <div class={f.divClass}>
        <textarea
          name={f.name}
          className={f.className}
          placeholder={f.placeholder}
          cols={f.cols}
          rows={f.cols}
        />
      </div>
    </React.Fragment>
  );
};

export const InputItem = ({ field }) => {
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
