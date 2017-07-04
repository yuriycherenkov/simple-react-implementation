import _ from 'lodash';
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

  // checkToRender();
  let newObj;
  const deepEqual = (x, y) => (
    (x && y && typeof x === 'object' && typeof y === 'object') ?
      (Object.keys(x).length === Object.keys(y).length) &&
        Object.keys(x).reduce((isEqual, key) => {
          if (key === 'props') {
            console.log('isEqual ', isEqual, 'key ', key, 'x[key], y[key]: ', x[key], y[key]);
          }
          if (key === 'children') {
             console.log('isEqual ', isEqual, 'key ', key, 'x[key], y[key]: ', x[key], y[key]);
          }
          return isEqual && deepEqual(x[key], y[key]);
        }, true) : (x === y)
  );

  if (Obj.render) {
    newObj = _.merge(Obj.render(), { id: Obj.props.id });
    domElement.innerHTML = '';
    // console.log(_.isEqual(VDom, newObj));
    console.log('/-------------- start -----------------/');
    deepEqual(VDom, newObj);
    console.log('/--------------- end ----------------/');
    const shouldBeShown = parseVDom(newObj);
    domElement.appendChild(shouldBeShown);
  } else {
    newObj = _.merge({}, Obj);
    VDom = _.merge({}, Obj);
    console.log('/------------ start -------------------/');
    deepEqual(newObj, VDom);
    console.log('/------------- end ------------------/');
    const shouldBeShown = parseVDom(Obj);
    domElement.appendChild(shouldBeShown);
  }

  console.log('newObj ', newObj, 'VDOm ', VDom);
};
