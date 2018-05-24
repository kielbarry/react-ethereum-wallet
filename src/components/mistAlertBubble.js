import React, { Component } from 'react'

class MistAlertBubble extends Component {
	render() {
		return (
	      <div className="show-alert alert-bubble { this.props.bubbleViewState }">
	        <button onClick={ () => this.props.onClick() } >
	          <span className="icon-bell"></span>
	        </button>
	      </div>
		)
	}
}

export default MistAlertBubble