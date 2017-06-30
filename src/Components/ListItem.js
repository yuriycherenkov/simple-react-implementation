import Component from '../Component';
import React from '../React';

export default class ListItem extends Component {
  render() {
    return (
      React.createElement('li', { text: this.props.item })
    );
  }
}
