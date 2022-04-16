function manageCola(cola, setCount) {
  let colas = {
    Original_Cola: 3,
    Violet_Cola: 3,
    Yellow_Cola: 3,
    Cool_Cola: 3,
    Green_Cola: 3,
    Orange_Cola: 3,
  };
  return {
    get: function (cola) {
      return colas[cola];
    },
    set: function (cola) {
      return (colas[cola] = setCount);
    },
    add: function (cola) {
      return ++colas[cola];
    },
    sub: function (cola) {
      return --colas[cola];
    },
  };
}

let colas = manageCola();

export default colas;
