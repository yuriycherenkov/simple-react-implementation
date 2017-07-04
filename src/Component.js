import _ from 'lodash';
import { render } from './render';

export default class SimpleComponent {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
    this.shouldComponentUpdate.bind(this);
  }

  setState = (newState) => {
    const entryPoint = document.getElementById(this.props.id);
    if (this.shouldComponentUpdate(newState)) {
      const newChangedState = _.merge(this.state, newState);

      render(this, entryPoint);
      return newChangedState;
    }
    return this.state;
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      console.log('render simple component')
    );
  }
}

