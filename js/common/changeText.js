export const makeKoreaUnit = (firstMoney, secondMoney = 0) => {
  return Number(firstMoney) + Number(secondMoney) + " 원";
};

export const attachNode = (node, text) => {
  node.innerHTML = text;
};
