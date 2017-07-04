import _ from 'lodash';

let VDom = {};

export const render = (Obj, domElement) => {
  const parseVDom = (obj) => {
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
        console.log('props ', key, prewObj[key], currentObj[key]);
      }

      if (key === 'children') {
        if (prewObj[key].length === currentObj[key].length) {
          for (let i = 0; i < prewObj[key].length; i++) { // if length equals
            deepEqual(prewObj[key][i], currentObj[key][i]);
            console.log('in loop ', prewObj[key][i]);
          }
        } else {
          console.log('prewObj ', prewObj, 'currentObj ', currentObj);
          const oldElem = document.getElementById(prewObj.id);
          console.log('newElem ', oldElem);
          const shouldBeShown = parseVDom(currentObj);
          domElement.appendChild(shouldBeShown);
        }
        console.log(prewObj[key].length, currentObj[key].length);
      }
    });
  };

  if (Obj.render) {
    // console.log('Obj.render() ', Obj.render(), 'VDom ', VDom);
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
