const eventRegistry = {}; // Almacena eventos globales

const globalEventHandler = (event) => {
  const { type, target } = event;

  // Buscar el atributo `data-event`
  const eventType = target.closest(`[data-event]`)?.getAttribute("data-event");

  if (eventType && eventRegistry[type] && eventRegistry[type][eventType]) {
    eventRegistry[type][eventType](event); // Ejecutar la función correspondiente
  }
};

// Función para registrar eventos globales
const registerEvent = (eventType, eventName, callback) => {
  if (!eventRegistry[eventType]) {
    eventRegistry[eventType] = {};
    document.addEventListener(eventType, globalEventHandler);
  }

  eventRegistry[eventType][eventName] = callback;
};

// Función para eliminar eventos si es necesario
const removeEvent = (eventType, eventName) => {
  if (eventRegistry[eventType]) {
    delete eventRegistry[eventType][eventName];

    if (Object.keys(eventRegistry[eventType]).length === 0) {
      document.removeEventListener(eventType, globalEventHandler);
      delete eventRegistry[eventType];
    }
  }
};

export { registerEvent, removeEvent };
