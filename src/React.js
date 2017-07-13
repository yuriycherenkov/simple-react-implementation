import _merge from 'lodash/merge';
import uniqid from 'uniqid';

export class Component {
  constructor(props) {
    this.state = {};
    this.props = props;
    this.id = `react-id-${uniqid()}`;
    this.subscribers = [];
  }

  updater = (subscriber) => {
    this.subscribers.push(subscriber);
  };

  setState = (newState) => {
    this.state = _merge(this.state, newState);
    const renderedInstance = Object.assign({}, this.render(), { linkToInstance: this });
    this.subscribers.forEach(update => update(renderedInstance));
  };

  render() { throw new Error('render method required'); }
}

export default {
  createElement: (Type, config = {}, ...oldChildren) => {
    oldChildren.forEach((child) => {
      if (Array.isArray(child)) {
        oldChildren.forEach((destrChild) => {
          oldChildren = destrChild;
        });
      }
    });

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

    props.children = oldChildren;
    return { type: Type, props };
  },
};
