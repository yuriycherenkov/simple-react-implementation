import { render } from './render';

// const fragment = document.createDocumentFragment();

export const parseVDom = (obj) => {
  const element = document.createElement(obj.type);
  element.id = obj.id;

  // console.log(obj);

<<<<<<< HEAD
=======
  if (obj.type === 'text') {
    element.innerHTML = obj.type;
  }

>>>>>>> 20b3b9161e2e77f4d2c2651df82c346eb953e81c
  if (!Array.isArray(obj)) {
    Object.keys(obj.props).map((key) => {
      if (key === 'text') {
        element.innerHTML = obj.props[key];
      }
      if (key === 'onChange') {
        element.addEventListener('keyup', obj.props[key]);
      }

<<<<<<< HEAD
      if (key === 'value') {
        element.value = obj.props[key];
      }

=======
>>>>>>> 20b3b9161e2e77f4d2c2651df82c346eb953e81c
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
<<<<<<< HEAD

=======
>>>>>>> 20b3b9161e2e77f4d2c2651df82c346eb953e81c
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
    const newChangedState = Object.keys(newState).map(key => (this.state[key] = newState[key]));

    render(this, entryPoint);
    return newChangedState;
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

