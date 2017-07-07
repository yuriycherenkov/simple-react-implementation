const uniqid = require('uniqid');

const createNewInstance = (NewObj, props = {}) => {
  const newID = `react-id-${uniqid()}`;
  const newInstance = new NewObj(props, newID);

  newInstance.props = props;
  return newInstance;
};

export default {
  createElement: (type, props = {}, ...children) => {
    if (typeof type !== 'string') {
      return createNewInstance(type, props);
    }
    return { type, props, children };
  },
};
