import { render } from './render';

// const fragment = document.createDocumentFragment();

export const parseVDom = (obj) => {
  const element = document.createElement(obj.type);
  element.id = obj.id;

  // console.log(obj);

  if (obj.type === 'text') {
    element.innerHTML = obj.type;
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

    // obj.children.map(child => {
    //   parseVDom(child);
    // });
    obj.children
      .map(parseVDom)
      .forEach(element.appendChild.bind(element));
  } else {
    obj
      .map(parseVDom)
      .forEach(element.appendChild.bind(element));
  }

  // fragment.appendChild(element);

  // obj.children.map(child => {
  //   console.log(child);
  //   parseVDom(child);
  // });

  // console.log(fragment);

  return element;
};

export default class SimpleComponent {
  constructor(id, props = {}) {
    this.state = {};
    this.props = props;
    this.id = id;
    this.checkToRender();
  }

  setState = (newState) => {
    const entryPoint = document.getElementById(this.id);
    render(this, entryPoint);

    return Object.keys(newState).map(key => (this.state[key] = newState[key]));
  }

  onClick = (event) => {
    console.log(event, 'click');
  }

  onChange = (event) => {
    console.log('onChange', event);
  }

  shouldComponentUpdate = (nextState) => {
    return true;
  };

  checkToRender = () => {
    if (this.shouldComponentUpdate()) {
      // render();
    }
  };

  render() {
    return (
      console.log('render simple component')
    );
  }

}

