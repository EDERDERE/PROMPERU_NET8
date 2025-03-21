export function useState(initialValue) {
  let state = initialValue;
  const listeners = [];

  const setState = (newValue) => {
    state = newValue;
    listeners.forEach((listener) => listener(state));
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return { getState, setState, subscribe };
}
