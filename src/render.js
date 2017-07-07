/*
  handle html properties, lisnteners etc.
*/
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
    if (key === 'defaultValue') {
      element.setAttribute('value', obj.props[key]);
    }
  });
};

/*
  should be return html markup from obj
*/
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

/*
  Deep compare of the previous and current vDom
  and replace dom node if props or its children has been changed
*/
const deepEqualVDom = (prewObj, currentObj) => {
  Object.keys(prewObj).forEach((key) => {
    if (key === 'props') {
      if (currentObj.id && prewObj.id) {
        currentObj.id = prewObj.id;
      }
      Object.keys(prewObj[key]).forEach((objKey) => {
        if (prewObj[key][objKey] !== currentObj[key][objKey]) {
          (prewObj[key][objKey] = currentObj[key][objKey]);
          const oldElem = document.getElementById(prewObj.id);
          if (prewObj.type !== 'input') {
            oldElem.parentNode.replaceChild(parseVDom(currentObj), oldElem);
          } else {
            oldElem.value = currentObj[key].value;
          }
        }
      });
    }

    if (key === 'children') {
      if (prewObj[key].length === currentObj[key].length) {
        for (let i = 0; i < prewObj[key].length; i++) {
          deepEqualVDom(prewObj[key][i], currentObj[key][i]);
        }
      } else {
        const oldElem = document.getElementById(prewObj.id);
        oldElem.parentNode.replaceChild(parseVDom(currentObj), oldElem);
      }
    }
  });
};

const checkChildRender = (obj, getRenderedVDom) => {
  if (obj.children.length) {
    obj.children.forEach((child, index) => {
      obj.children[index] = getRenderedVDom(child);
    });
  }
};

/*
  should be return result of method execution render if it is an instance
*/
const getRenderedVDom = (obj) => {
  if (obj.render) {
    const newObj = Object.assign({}, obj.render(), { id: obj.id });
    checkChildRender(newObj, getRenderedVDom);
    return newObj;
  }
  checkChildRender(obj, getRenderedVDom);
  return obj;
};

let prevVDom = null;
export default (obj, domElement) => {
  const rebuildDom = (object, domElem) => {
    const newDomElem = document.createElement('div');
    const currentVDom = getRenderedVDom(object);
    const shouldBeShown = parseVDom(currentVDom);

    if (!prevVDom) {
      domElem.appendChild(newDomElem);
      newDomElem.parentNode.replaceChild(shouldBeShown, newDomElem);

      prevVDom = Object.assign({}, currentVDom);
    } else {
      deepEqualVDom(prevVDom, currentVDom);
      prevVDom = Object.assign({}, currentVDom);
    }
  };

  rebuildDom(obj, domElement);
  obj.updater(rebuildDom);
};
