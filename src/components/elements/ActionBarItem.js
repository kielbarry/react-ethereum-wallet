import React from 'react';

export const ActionBarItem = props => {
  return (
    <li>
      <a
        href={props.href}
        title={props.title}
        target="noopener noreferrer _blank"
      >
        <i className={props.icon} />
        {props.text}
      </a>
    </li>
  );
};

export default ActionBarItem;
