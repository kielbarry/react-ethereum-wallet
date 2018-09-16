import React, { PureComponent } from 'react';

class GlobalNotification extends PureComponent {
	render() {
		var cn = require('classnames');
	    var newClasses = cn({
	    	'global-notification': true,
	    // 	'error': this.props.warningType == 'error',
	    // 	'warning': this.props.warningType == 'warning',
	    // 	'info': this.props.warningType == 'info',
	    // 	'success': this.props.warningType == 'success',
	    	'animate': true
	    });
	    return (
	      <div className="global-notifications">
	        <div className={newClasses}>
	          <p>this.props.messageText</p>
	        </div>
	      </div>
	    )
	}
}

export default GlobalNotification