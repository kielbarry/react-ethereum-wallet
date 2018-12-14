import React, { Component } from 'react';
// import { connect } from 'react-redux';

class TestInputItem extends Component {
  renderInputType(f) {
    return (
      <React.Fragment>
        <h3>{f.title}</h3>
        <div className={f.divClass}>
          <input
            type={f.type}
            name={f.name}
            placeholder={f.placeholder}
            className={f.className}
            onKeyUp={e => this.props.onKeyUp(e)}
          />
        </div>
      </React.Fragment>
    );
  }

  renderTextAreaType(f) {
    if (!f.cols) f.cols = 30;
    if (!f.rows) f.rows = 10;
    return (
      <React.Fragment>
        <h3>{f.title}</h3>
        <div className={f.divClass}>
          <input
            type={f.type}
            name={f.name}
            placeholder={f.placeholder}
            className={f.className}
            onKeyUp={e => this.props.onKeyUp(e)}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    const field = this.props.field;
    return (
      <React.Fragment>
        {field.editor === 'textarea'
          ? this.renderTextAreaType(field)
          : this.renderInputType(field)}
      </React.Fragment>
    );
  }
}

export default TestInputItem;
