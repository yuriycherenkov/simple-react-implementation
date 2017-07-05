const uniqid = require('uniqid');

export const isClass = testForClass =>
  typeof testForClass === 'function' && testForClass.prototype.constructor === testForClass;

export const createNewInstance = (NewObj, props = {}, id = `react-id-${uniqid()}`) => {
  const newInstance = new NewObj(props);

  newInstance.props = props;
  newInstance.props.id = id;

  const newObj = Object.assign({}, newInstance.render(), { id: newInstance.props.id });
  // console.log('new object ', newObj);
  return newObj;
};

