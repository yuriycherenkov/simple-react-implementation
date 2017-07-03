import _ from 'lodash';
import { render } from './render';

export const parseVDom = (obj) => {
  const element = document.createElement(obj.type);

  if (obj.id) {
    element.id = obj.id;
  }

  if (!Array.isArray(obj)) {
    Object.keys(obj.props).map((key) => {
      if (key === 'text') {
        element.innerHTML = obj.props[key];
      }
      if (key === 'onChange') {
        element.addEventListener('keyup', obj.props[key]);
      }

      if (key === 'onClick') {
        element.addEventListener('click', obj.props[key]);
      }

      if (key === 'value') {
        element.value = obj.props[key];
      }

      return key;
    });

    if (obj.children) {
     // console.log('obj.children ', obj.children);
      obj.children
      .map(parseVDom)
      .forEach(element.appendChild.bind(element));
    }
  } else {
    obj
      .map(parseVDom)
      .forEach(element.appendChild.bind(element));
  }
  // console.log(element);
  return element;
};

const currState = {
  state: null,
  props: {},
};

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

  onClick = (event) => {
    console.log(event, 'click');
  }

  onChange = (event) => {
    console.log('onChange', event);
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

