import _ from 'lodash';

let VDom = {};

const handleProps = (obj, element) => {
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
      element.setAttribute(key, obj.props[key]);
      element.value = obj.props[key];
    }

    return key;
  });
};

export const render = (Obj, domElement) => {
  let newObj;

  const parseVDom = (obj) => {
    const element = document.createElement(obj.type);
    if (obj.id) {
      element.id = obj.id;
    }

    if (!Array.isArray(obj)) {
      handleProps(obj, element);

      if (obj.children) {
        obj.children
        .map(parseVDom)
        .forEach(element.appendChild.bind(element));
      }
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
        Object.keys(prewObj[key]).map((objKey) => {
          if (prewObj[key][objKey] !== currentObj[key][objKey]) {
            (prewObj[key][objKey] = currentObj[key][objKey]);
          }
          return prewObj[key];
        });
      }

      if (key === 'children') {
        if (prewObj[key].length === currentObj[key].length) {
          for (let i = 0; i < prewObj[key].length; i++) {
            deepEqualVDom(prewObj[key][i], currentObj[key][i]);
            if (prewObj[key][i].type === 'input') {
              const oldInput = document.getElementById(prewObj[key][i].id);
              oldInput.setAttribute('value', currentObj[key][i].props.value);
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

  if (Obj.render) {
    newObj = _.merge(Obj.render(), { id: Obj.props.id });
    console.log('/-------------- start -----------------/');
    deepEqualVDom(VDom, newObj);
    console.log('/--------------- end ----------------/');

    VDom = _.merge({}, newObj);
  } else {
    newObj = _.merge({}, Obj);
    VDom = _.merge({}, Obj);
    const shouldBeShown = parseVDom(Obj);
    domElement.appendChild(shouldBeShown);
  }
};
