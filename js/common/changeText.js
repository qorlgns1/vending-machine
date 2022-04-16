import { comma } from "./comma.js";

export const makeKoreaUnit = (firstMoney, secondMoney = 0) => {
  return comma.change(Number(firstMoney) + Number(secondMoney)) + " 원";
};

export const attachNode = (node, text) => {
  node.innerHTML = text;
};
