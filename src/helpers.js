const uniqid = require('uniqid');

export const createNewInstance = (NewObj, props = {}) => {
  const newID = `react-id-${uniqid()}`;
  const newInstance = new NewObj(props, newID);

  newInstance.props = props;
  const newObj = Object.assign({}, newInstance.render(), { id: newID });
  return newObj;
};

