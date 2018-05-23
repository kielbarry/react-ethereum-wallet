import React, { Component } from 'react'

class MistAlertBubble extends Component {
	render() {
		return (
	      <div className="show-alert alert-bubble {{bubbleViewState}}">
	        <button>
	          <span className="icon-bell"></span>
	        </button>
	      </div>
		)
	}
}

export default MistAlertBubble