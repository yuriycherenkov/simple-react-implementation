const createNewInstance = (NewObj, props = {}) => {
  const newInstance = new NewObj(props);
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
