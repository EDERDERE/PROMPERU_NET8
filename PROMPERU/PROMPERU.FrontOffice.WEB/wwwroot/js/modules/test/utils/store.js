export const createState = (initialState) => {
  let state = { ...initialState };
  let listeners = [];
  let watchers = {}; // Almacena los listeners de propiedades específicas

  const setState = (newState) => {
    const prevState = { ...state };
    state = { ...state, ...newState };

    // Notifica a todos los listeners generales
    listeners.forEach((listener) => listener(state));

    // Notifica solo a los watchers de propiedades específicas
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
