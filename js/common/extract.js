export const extractNum = (num) => {
  return num.toString().replace(/[^0-9]/g, "");
};

export const getColaIndexNode = (selector, cola) => {
  var elem = document.querySelectorAll(selector);
  for (var i = 0; i < elem.length; i++) {
    if (elem[i].children[1].innerHTML === cola) {
      return i;
    }
  }
};
