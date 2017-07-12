import React, { Component } from '../React';

import ListItem from './ListItem';

export default class List extends Component {
  render() {
    return React.createElement('ul', {},
      ...this.props.listItems.map(item =>
        <ListItem item={item} />),
    );
  }
}
