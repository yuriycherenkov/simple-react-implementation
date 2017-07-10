import _merge from 'lodash/merge';
import uniqid from 'uniqid';

export default class SimpleComponent {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
    this.id = `react-id-${uniqid()}`;
    this.subscribers = [];
    this.shouldComponentUpdate.bind(this);
  }

  updater = (subscriber) => {
    this.subscribers.push(subscriber);
  };

  setState = (newState) => {
    const newChangedState = _merge(this.state, newState);
    const container = document.getElementById(this.id);
    const renderedInstance = Object.assign({}, this.render(), { linkToInstance: this });

    this.shouldComponentUpdate(newState);
    this.subscribers.forEach(update => update(renderedInstance, container));

    return newChangedState;
  };

  shouldComponentUpdate() {
    return true;
  }

  render() { throw new Error('render method must be implemented'); }
}

