import * as helpers from './helpers';
import { parseVDom } from './Component';

const uniqid = require('uniqid');

let VDom = {};

export const render = (Obj, node) => {
  const checkEntryPoint = (enterPoint) => {
    if (enterPoint instanceof HTMLElement) {
      return enterPoint;
    }
    if (enterPoint === 'string') {
      const nodeElem = document.querySelector(enterPoint);
      return nodeElem !== null ? nodeElem : (() => new Error(`cant find dom node by ${enterPoint} selector`)());
    }
    return new Error(`cant find ${enterPoint} elem`);
  };

  const entryPoint = checkEntryPoint(node);
  // entryPoint.innerHTML = '';

  const checkId = (newObj) => {
    // if (newObj.props === 'input') {
    //   console.log('checkId', newObj.render());
    // }
    console.log('newObj id', newObj, Obj.props.id, 'VDom ', VDom);
  };

  const uniqId = `react-id-${uniqid()}`;
  console.log(uniqId);

  if (helpers.isClass(Obj)) {
    VDom = Object.assign({}, helpers.createNewInstance(Obj, undefined, uniqId));
   // console.log('VDom ', VDom);

    entryPoint.appendChild(parseVDom(helpers.createNewInstance(Obj, undefined, uniqId)));
  } else {
    const newObjRender = Object.assign({}, Obj.render(), { id: Obj.props.id });
    checkId(newObjRender);
   // console.log('newObjRender ', newObjRender);
    entryPoint.appendChild(parseVDom(newObjRender));
  }

};
