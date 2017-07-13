const addOnHandler = (element, handler, func) => {
  if (/^on/.test(handler)) {
    const htmlHandler = handler.substring(2).toLowerCase();
    element.addEventListener(htmlHandler, func);
  }
};

/*
  handle html properties, lisnteners etc.
*/
const handleProps = (obj, element) => {
  Object.keys(obj.props).forEach((key) => {
    if (key === 'value') {
      element.value = obj.props[key];
    }
    if (key === 'defaultValue') {
      element.setAttribute('value', obj.props[key]);
    }

    if (key === 'onChange') {
      element.addEventListener('input', obj.props[key]);
    } else {
      addOnHandler(element, key, obj.props[key]);
    }
  });
};

/*
  should be return html markup from obj
*/
const parseVDom = (obj) => {
  let element;
  if (typeof obj !== 'string') {
    element = document.createElement(obj.type);

    element.id = obj.linkToInstance.id;
    handleProps(obj, element);

    obj.props.children.forEach((child) => {
      if (typeof child !== 'string') {
        element.appendChild(parseVDom(child));
      } else {
        element.appendChild(document.createTextNode(child));
      }
    });
  }
  return element;
};

/*
  Deep compare of the previous and current vDom
  and replace dom node if props or its children. has been changed
*/
const deepEqualVDom = (prewObj, currentObj) => {
  if (typeof prewObj === 'string') return;
  const prewProps = prewObj.props;
  const currProps = currentObj.props;
  const prevChild = prewProps.children;
  const currChild = currProps.children;

  currentObj.linkToInstance.id = prewObj.linkToInstance.id;

  Object.keys(prewProps).forEach((objKey) => {
    if (prewProps[objKey] !== currProps[objKey]
      && typeof prewProps[objKey] !== 'function'
      && typeof prewProps[objKey] !== 'object') {
      const oldElem = document.getElementById(prewObj.linkToInstance.id);
      if (prewObj.type !== currentObj.type) {
        const shouldBeShown = parseVDom(currentObj);
        oldElem.parentNode.replaceChild(shouldBeShown, oldElem);
      } else {
        handleProps(currentObj, oldElem);
      }
    }
  });

  if (prevChild.length === currChild.length) {
    for (let i = 0; i < prevChild.length; i++) {
      deepEqualVDom(prevChild[i], currChild[i]);
    }
  } else {
    let smallerLength;
    if (prevChild.length < currChild.length) {      
      smallerLength = prevChild.length;
      // add to list
      currChild.forEach((child, index) => {
        if (index < smallerLength) {
          deepEqualVDom(prevChild[index], currChild[index]);
        } else {
          const newElement = parseVDom(child);
          const parentNode = document.getElementById(prewObj.linkToInstance.id);
          parentNode.appendChild(newElement);
        }
      });
    } else {
      // remove from list
      // TODO fix remove from list
      smallerLength = currChild.length;
      prevChild.forEach((child, index) => {
        if (index > smallerLength) {
          const removedElem = parseVDom(child);
        }
      });
    }
  }
};

/*
  should be return result of method execution render
*/
const getRenderedVDom = (obj) => {
  obj.props.children.forEach((child, index) => {
    if (typeof child !== 'string') {
      obj.props.children[index] = getRenderedVDom(child);
    }
  });
  return obj;
};

let prevVDom = null;
export default (obj, domElement) => {
  const rebuildDom = (object) => {
    const currentVDom = getRenderedVDom(object);
    if (!prevVDom) {
      const shouldBeShown = parseVDom(currentVDom);
      domElement.appendChild(shouldBeShown);
    } else {
      deepEqualVDom(prevVDom, currentVDom);
    }
    prevVDom = Object.assign({}, currentVDom);
  };

  rebuildDom(obj);
  obj.linkToInstance.updater(rebuildDom);
};
