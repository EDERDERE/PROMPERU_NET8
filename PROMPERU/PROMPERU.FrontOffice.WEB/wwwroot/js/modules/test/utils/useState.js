export function useState(initialValue) {
  let state = initialValue;
  const listeners = [];

  const setState = (newValue) => {
    state = newValue;
    listeners.forEach((listener) => listener(state)); // Notificar a los suscriptores
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return { getState, setState, subscribe };
}
