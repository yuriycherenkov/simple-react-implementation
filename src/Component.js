import _merge from 'lodash/merge';
import { render } from './render';

export default class SimpleComponent {
  constructor(props = {}, id) {
    this.state = {};
    this.props = props;
    this.id = id;
    this.shouldComponentUpdate.bind(this);
  }

  setState = (newState) => {
    const entryPoint = document.getElementById(this.id);
    const newChangedState = _merge(this.state, newState);

    if (this.render) {
      const newObj = _merge(this.render(), { id: this.id });
      render(newObj, entryPoint);
    } else {
      render(this, entryPoint);
    }

    return newChangedState;
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {}
}

