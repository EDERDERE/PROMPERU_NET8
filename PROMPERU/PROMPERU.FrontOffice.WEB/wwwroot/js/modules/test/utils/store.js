export const createState = (initialState) => {
  let state = { ...initialState };
  let listeners = [];
  let watchers = {};

  const setState = (newState) => {
    const prevState = { ...state };
    state = { ...state, ...newState };

    listeners.forEach((listener) => listener(state));

    Object.keys(newState).forEach((key) => {
      if (watchers[key] && prevState[key] !== newState[key]) {
        watchers[key].forEach((callback) => callback(newState[key]));
      }
    });
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  const watch = (key, callback) => {
    if (!watchers[key]) {
      watchers[key] = [];
    }
    watchers[key].push(callback);
  };

  return { getState, setState, subscribe, watch };
};
