import { makeKoreaUnit, attachNode } from "../common/changeText.js";
import { getLocalStorageMoney } from "../common/localstorage.js";
import { getMyMoneyNode } from "./depositMoney.js";

export const firstVisitChargeMoney = () => {
  const myMoneyNode = getMyMoneyNode();

  if (!getLocalStorageMoney()) {
    localStorage.setItem("money", 10000);
    attachNode(myMoneyNode, makeKoreaUnit(getLocalStorageMoney()));
  } else {
    attachNode(myMoneyNode, makeKoreaUnit(getLocalStorageMoney()));
  }
};
