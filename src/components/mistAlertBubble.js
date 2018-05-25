import React, { Component } from 'react'

class MistAlertBubble extends Component {
	render() {

		var cn = require( 'classnames' );
		var newStyles = cn({ "show-alert": true, "alert-bubble": true, "is-hidden": this.props.validStyles })

		return (
	      <div className={newStyles}>
	        <button onClick={ () => this.props.onClick() } >
	          <span className="icon-bell"></span>
	        </button>
	      </div>
		)
	}
}

export default MistAlertBubble