export const emit = () => {
  throw Error("`emit` function isn't available during Server-Side Rendering.");
};

export const findDOMNode = () => {
  throw Error("`findDOMNode` function isn't available during Server-Side Rendering.");
};

export const containsDOMElement = () => {
  throw Error("`containsDOMElement` function isn't available during Server-Side Rendering.");
};

export const hasDOMElement = () => {
  throw Error("`hasDOMElement` function isn't available during Server-Side Rendering.");
};
