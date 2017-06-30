import * as helpers from './helpers';
import { parseVDom } from './Component';
const uniqid = require('uniqid');

export const render = (Obj, node) => {
  const checkEntryPoint = (enterPoint) => {
    if (enterPoint instanceof HTMLElement) {
      return enterPoint;
    }
    if (enterPoint === 'string') {
      const nodeElem = document.querySelector(enterPoint);
      return nodeElem !== null ? nodeElem : (() => new Error(`cant find dom node by ${enterPoint} selector`)());
    }
    return new Error(`cant find ${node} elem`);
  };

  const entryPoint = checkEntryPoint(node);
  entryPoint.innerHTML = '';

  if (helpers.isClass(Obj)) {
    entryPoint.appendChild(parseVDom(helpers.createNewInstance(Obj)));
  } else {
    const newObjRender = Object.assign({}, Obj.render(), { id: `react-id-${uniqid()}` });
    entryPoint.appendChild(parseVDom(newObjRender));
  }
};
