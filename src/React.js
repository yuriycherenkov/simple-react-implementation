import * as helpers from './helpers';

export default {
  createElement: (type, props = {}, ...children) => {
    if (typeof type !== 'string') {
      return helpers.createNewInstance(type, props);
    }
    return { type, props, children };
  },
};
