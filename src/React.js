const createNewInstance = (NewObj, props) => {
  const newInstance = new NewObj(props);
  return Object.assign({}, newInstance.render(), { linkToInstance: newInstance });
};

export default {
  createElement: (type, props = {}, ...children) => {
    if (typeof type !== 'string') {
      return createNewInstance(type, props);
    }
    return { type, props, children };
  },
};
