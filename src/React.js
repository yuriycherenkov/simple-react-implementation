import * as helpers from './helpers';

class React {
  createElement = (type, props = {}, ...children) => {
    if (helpers.isClass(type)) {
      return helpers.createNewInstance(type, props);
    }
    return { type, props, children };
  }
}

export default new React();
