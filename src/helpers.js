const uniqid = require('uniqid');

export const createNewInstance = (NewObj, props = {}) => {
  const newID = `react-id-${uniqid()}`;
  const newInstance = new NewObj(props, newID);

  newInstance.props = props;
  newInstance.linkToClass = NewObj;
  // console.log('new instance', newInstance);

  return newInstance;
};

