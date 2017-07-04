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
      // console.log('obj.children ', obj.children);
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
  const deepEqual = (x, y) => (
    (x && y && typeof x === 'object' && typeof y === 'object') ?
      (Object.keys(x).length === Object.keys(y).length) &&
        Object.keys(x).reduce((isEqual, key) => {
          if (key === 'props' && !deepEqual(x[key], y[key])) {
            console.log('props ', deepEqual(x[key], y[key]), 'key: ', key, 'x[key], y[key]: ', x[key], y[key]);
            if (y[key].value !== x[key].value) {
              console.log('value: ', y[key].value, 'id: ', y.id, 'obj: ', y[key], 'x', x.id);
              const oldInput = parseVDom(x);
              oldInput.value = y[key].value;
            } // ...title?
          }
          if (key === 'children') {
            x[key].map(child => console.log('child x : ', child));
            y[key].map(child => console.log('child y : ', child));
            if (x[key].length === y[key].length) {
              console.log('children x[key], y[key]: ', x[key], y[key]);
            } else {
              console.log('children x[key], y[key] length !==', x[key], y[key]);
            }
          }
          return isEqual && deepEqual(x[key], y[key]);
        }, true) : (x === y)
  );

  if (Obj.render) {
    newObj = Object.assign(Obj.render(), { id: Obj.props.id });
    console.log('/-------------- start -----------------/');
    deepEqual(VDom, newObj);
    console.log('/--------------- end ----------------/');
    VDom = Object.assign({}, newObj);
   // const shouldBeShown = parseVDom(newObj);
   // console.log(shouldBeShown);
   // domElement.innerHTML = '';
   // domElement.appendChild(shouldBeShown);
  } else {
    newObj = Object.assign({}, Obj);
    VDom = Object.assign({}, Obj);
    // console.log('/------------ start -------------------/');
    // deepEqual(newObj, VDom);
    // console.log('/------------- end ------------------/');
    const shouldBeShown = parseVDom(Obj);
    domElement.appendChild(shouldBeShown);
  }

  // console.log('newObj ', newObj, 'VDOm ', VDom);
};
