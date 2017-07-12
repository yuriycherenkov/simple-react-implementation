import React, { Component } from '../React';

export default class Button extends Component {
  onClick = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      React.createElement('button', { onClick: this.onClick }, 'submit')
    );
  }
}

