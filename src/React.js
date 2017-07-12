import _merge from 'lodash/merge';
import uniqid from 'uniqid';

export class Component {
  constructor(props) {
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
    this.state = _merge(this.state, newState);
    const renderedInstance = Object.assign({}, this.render(), { linkToInstance: this });
    this.shouldComponentUpdate(newState);
    this.subscribers.forEach(update => update(renderedInstance));
  };

  shouldComponentUpdate() {
    return true;
  }

  render() { throw new Error('render method required'); }
}

export default {
  createElement: (Type, config = {}, ...children) => {
    const props = {};
    if (typeof Type !== 'string') {
      const instance = new Type(config);
      return { ...instance.render(), linkToInstance: instance };
    }
    for (const propName in config) {
      if (Object.prototype.hasOwnProperty.call(config, propName)) {
        props[propName] = config[propName];
      }
    }

    props.children = children;
    return { type: Type, props };
  },
};
