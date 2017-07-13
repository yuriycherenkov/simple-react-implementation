import React, { Component } from '../React';

export default class ListItem extends Component {
  render() {
    return (
      <li>{this.props.item}</li>
    );
  }
}
