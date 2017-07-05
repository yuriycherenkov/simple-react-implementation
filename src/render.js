import _ from 'lodash';

const uniqid = require('uniqid');

let VDom = {};
// `react-id-${uniqid()}`

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
      // element.value = obj.props[key];
    }

    return key;
  });
};

export const render = (Obj, domElement) => {
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

  let newObj;
  const deepEqual = (prewObj, currentObj) => {
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
            deepEqual(prewObj[key][i], currentObj[key][i]);
            if (prewObj[key][i].type === 'input') {
              // console.log('input prev ', prewObj[key][i], 'curr ', currentObj[key][i]);
              const oldInput = document.getElementById(prewObj[key][i].id);
              handleProps(currentObj[key][i], oldInput);
              oldInput.id = currentObj[key][i].id;
            }
          }
        } else {
          console.log('prewObj ', prewObj[key], 'currentObj ', currentObj[key]);
          const oldElem = document.getElementById(prewObj.id);

          // parentDiv.replaceChild(sp1, sp2);
          const shouldBeShown = parseVDom(currentObj);
          oldElem.parentNode.replaceChild(shouldBeShown, oldElem);
        }
      }
    });
  };

  if (Obj.render) {
    newObj = _.merge(Obj.render(), { id: Obj.props.id });
    // console.log('VDOM ', VDom, 'newObj ', newObj);
    console.log('/-------------- start -----------------/');
    deepEqual(VDom, newObj);
    console.log('/--------------- end ----------------/');
   // const shouldBeShown = parseVDom(newObj);
   // console.log(shouldBeShown);
   // domElement.innerHTML = '';
   // domElement.appendChild(shouldBeShown);
    VDom = _.merge({}, newObj);
  } else {
    newObj = _.merge({}, Obj);
    VDom = _.merge({}, Obj);
    console.log('Obj ', Obj);
    const shouldBeShown = parseVDom(Obj);
    domElement.appendChild(shouldBeShown);
  }
};
