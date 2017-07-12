import React, { Component } from '../React';

export default class ListItem extends Component {
  render() {
    return (
      React.createElement('li', {}, this.props.item)
    );
  }
}
