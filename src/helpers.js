const uniqid = require('uniqid');

export const isClass = testForClass =>
  typeof testForClass === 'function' && testForClass.prototype.constructor === testForClass;

export const createNewInstance = (NewObj, props = {}) => {
  const uniquId = `react-id-${uniqid()}`;
  const newInstance = new NewObj(uniquId, props);

  newInstance.props = props;
  newInstance.props.id = uniquId;
  const newObj = Object.assign({}, newInstance.render(), { id: uniquId });

  return newObj;
};

