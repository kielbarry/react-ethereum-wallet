import React, { Component } from 'react'

class MistAlertBubble extends Component {
	render() {
		return (
		<div>
	      { this.props.validStyles.bubbleStyle } AAAAAAAAAAAAAAAAAAAAAAAAAAAA

	      <div className="show-alert alert-bubble { this.props.validStyles.bubbleStyle } ">
	        <button onClick={ () => this.props.onClick() } >
	          <span className="icon-bell"></span>
	        </button>
	      </div>
	    </div>
		)
	}
}

export default MistAlertBubble