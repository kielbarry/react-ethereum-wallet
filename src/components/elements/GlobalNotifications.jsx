import React, { PureComponent } from 'react';

class GlobalNotification extends PureComponent {
  render() {
    let cn = require('classnames');
    let newClasses = cn({
      'global-notification': true,
      // 	'error': this.props.warningType == 'error',
      // 	'warning': this.props.warningType == 'warning',
      // 	'info': this.props.warningType == 'info',
      // 	'success': this.props.warningType == 'success',
      animate: true,
    });
    let topDivClasses = cn({
      'global-notification': true,
      'is-hidden': true,
    });
    return (
      <div className={topDivClasses}>
        <div className={newClasses}>
          <p>this.props.messageText</p>
        </div>
      </div>
    );
  }
}

export default GlobalNotification;
