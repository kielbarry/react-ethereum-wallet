import React, { Component } from 'react';
import { connect } from 'react-redux';

class DeleteToken extends Component {
  constructor(props) {
    super(props);
    this.cancelFunction = this.cancelFunction.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.display !== prevProps.display) {
      return true;
    }
    return false;
  }

  cancelFunction(e) {
    this.props.closeModal('displayDeleteModal');
  }

  submitFunction(e) {
    this.props.closeModal('displayDeleteModal');
  }

  render() {
    return (
      <React.Fragment>
        <section class="dapp-modal-container">
          <p>
            Do you want to remove the token <strong>Unicorns</strong> from your
            list?
          </p>
          <div class="dapp-modal-buttons">
            <button class="cancel">Cancel</button>
            <button class="ok dapp-primary-button">OK</button>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(DeleteToken);
