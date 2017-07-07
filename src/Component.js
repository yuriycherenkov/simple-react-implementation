import _merge from 'lodash/merge';

export default class SimpleComponent {
  constructor(props = {}, id) {
    this.state = {};
    this.props = props;
    this.id = id;
    this.callback = null;
    this.shouldComponentUpdate.bind(this);
  }

  createSubscribers = (callback) => {
    this.callback = callback;
  };

  setState = (newState) => {
    const newChangedState = _merge(this.state, newState);
    const container = document.getElementById(this.id);

    this.shouldComponentUpdate(newState);
    this.callback(this, container);

    return newChangedState;
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {}
}

