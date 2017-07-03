import { parseVDom } from './Component';

let VDom = {};

export const render = (Obj, domElement) => {
  const checkToRender = () => {
    if (Obj.render().type === 'input') {
      const input = document.getElementById(Obj.props.id);
      input.value = Obj.state.value;
      return false;
    }
    return true;
  };

  VDom = Object.assign({}, Obj);
  // checkToRender();

  if (Obj.render) {
    domElement.innerHTML = '';
    const shouldBeShown = parseVDom(Obj.render());
    domElement.appendChild(shouldBeShown);
  } else {
    const shouldBeShown = parseVDom(Obj);
    domElement.appendChild(shouldBeShown);
  }
};
