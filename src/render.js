const checkAndAddHandler = (element, handler, func) => {
  if (/on{0,1}/.test(handler)) {
    const htmlHandler = handler.substring(2).toLowerCase();
    element.addEventListener(htmlHandler, func);
  }
};

/*
  handle html properties, lisnteners etc.
*/
const handleProps = (obj, element) => {
  Object.keys(obj.props).forEach((key) => {
    if (key === 'text') {
      element.textContent = obj.props[key];
    }
    if (key === 'value') {
      element.value = obj.props[key];
    }
    if (key === 'defaultValue') {
      element.setAttribute('value', obj.props[key]);
    }

    if (key === 'onChange') {
      element.addEventListener('keyup', obj.props[key]);
    } else {
      checkAndAddHandler(element, key, obj.props[key]);
    }
  });
};

/*
  should be return html markup from obj
*/
const parseVDom = (obj) => {
  const element = document.createElement(obj.type);
  element.id = obj.linkToInstance.id;
  handleProps(obj, element);

  obj.children.forEach(child =>
    element.appendChild(parseVDom(child)));
  return element;
};

/*
  Deep compare of the previous and current vDom
  and replace dom node if props or its children has been changed
*/
const deepEqualVDom = (prewObj, currentObj) => {
  Object.keys(prewObj).forEach((key) => {
    if (key === 'props') {
      currentObj.linkToInstance.id = prewObj.linkToInstance.id;

      Object.keys(prewObj[key]).forEach((objKey) => {
        if (prewObj[key][objKey] !== currentObj[key][objKey]) {
          const oldElem = document.getElementById(prewObj.linkToInstance.id);
          if (prewObj.type !== 'input') {
            const shouldBeShown = parseVDom(currentObj);
            oldElem.parentNode.replaceChild(shouldBeShown, oldElem);
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
        const oldElem = document.getElementById(prewObj.linkToInstance.id);
        oldElem.parentNode.replaceChild(parseVDom(currentObj), oldElem);
      }
    }
  });
};

/*
  should be return result of method execution render
*/
const getRenderedVDom = (obj) => {
  obj.children.forEach((child, index) => {
    obj.children[index] = getRenderedVDom(child);
  });
  return obj;
};

let prevVDom = null;
export default (obj, domElement) => {
  const rebuildDom = (object) => {
    const currentVDom = getRenderedVDom(object);
    const shouldBeShown = parseVDom(currentVDom);

    if (!prevVDom) {
      domElement.appendChild(shouldBeShown);
    } else {
      deepEqualVDom(prevVDom, currentVDom);
    }
    prevVDom = Object.assign({}, currentVDom);
  };

  rebuildDom(obj);
  obj.linkToInstance.updater(rebuildDom);
};
