const handleProps = (obj, element) => {
  Object.keys(obj.props).forEach((key) => {
    if (key === 'text') {
      element.textContent = obj.props[key];
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
  });
};

const parseVDom = (obj) => {
  const element = document.createElement(obj.type);
  if (obj.id) {
    element.id = obj.id;
  }

  if (obj.children) {
    handleProps(obj, element);
    obj.children
      .map(parseVDom)
      .forEach(element.appendChild.bind(element));
  } else {
    obj
      .map(parseVDom)
      .forEach(element.appendChild.bind(element));
  }

  return element;
};

const deepEqualVDom = (prewObj, currentObj) => {
  Object.keys(prewObj).forEach((key) => {
    if (key === 'props') {
      if (currentObj.id && prewObj.id) {
        currentObj.id = prewObj.id;
      }
      Object.keys(prewObj[key]).forEach((objKey) => {
        if (prewObj[key][objKey] !== currentObj[key][objKey]) {
          (prewObj[key][objKey] = currentObj[key][objKey]);
        }
      });
    }

    if (key === 'children') {
      if (prewObj[key].length === currentObj[key].length) {
        for (let i = 0; i < prewObj[key].length; i++) {
          deepEqualVDom(prewObj[key][i], currentObj[key][i]);
          if (prewObj[key][i].type === 'input') {
            const oldInput = document.getElementById(prewObj[key][i].id);
            oldInput.value = currentObj[key][i].props.value;
          }
        }
      } else {
        const oldElem = document.getElementById(prewObj.id);
        const shouldBeShown = parseVDom(currentObj);
        oldElem.parentNode.replaceChild(shouldBeShown, oldElem);
      }
    }
  });
};

let VDom = null;
export const render = (Obj, domElement) => {
  if (VDom) {
    console.log('/-------------- start -----------------/');
    deepEqualVDom(VDom, Obj);
    console.log('/--------------- end ----------------/');

    VDom = Object.assign({}, Obj);
  } else {
    VDom = Object.assign({}, Obj);
    const shouldBeShown = parseVDom(Obj);
    domElement.appendChild(shouldBeShown);
  }
};
