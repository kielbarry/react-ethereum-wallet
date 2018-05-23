import React, { Component } from 'react'

class MistAlertBubble extends Component {
	render() {
		return (
	      <div class="show-alert alert-bubble {{bubbleViewState}}">
	        <button>
	          <span class="icon-bell"></span>
	        </button>
	      </div>
		)
	}
}

export default MistAlertBubble