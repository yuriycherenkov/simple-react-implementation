import _merge from 'lodash/merge';
import uniqid from 'uniqid';

export default class SimpleComponent {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
    this.id = `react-id-${uniqid()}`;
    this.update = null;
    this.shouldComponentUpdate.bind(this);
  }

  updater = (update) => {
    this.update = update;
  };

  setState = (newState) => {
    const newChangedState = _merge(this.state, newState);
    const container = document.getElementById(this.id);

    this.shouldComponentUpdate(newState);
    this.update(this.render(), container);

    return newChangedState;
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {}
}

