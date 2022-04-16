import { makeKoreaUnit, attachNode } from "../common/changeText.js";
import { comma } from "../common/comma.js";
import { getLocalStorageMoney } from "../common/localstorage.js";

export const getLeftMoneyNode = () => {
  const leftMoneyNode = document.querySelector(".my-left-money").children[1];
  return leftMoneyNode;
};

export const getLeftMoney = () => {
  const leftMoneyNode = getLeftMoneyNode();
  const leftMoney = leftMoneyNode.innerHTML.split(" ")[0];
  if (!leftMoney) {
    return 0;
  } else {
    return comma.remove(leftMoney);
  }
};

export const getMyMoneyNode = () => {
  const myMoneyNode = document.querySelector(".my-money").children[1];
  return myMoneyNode;
};

export const depositAdd = (colaPrice) => {
  const leftMoneyNode = getLeftMoneyNode();
  attachNode(leftMoneyNode, makeKoreaUnit(getLeftMoney(), Number(colaPrice)));
};

export const depositSubtract = (colaPrice) => {
  const leftMoneyNode = getLeftMoneyNode();

  leftMoneyNode.innerHTML = comma.change(
    getLeftMoney() - Number(colaPrice) + " 원"
  );
};

export const depositMoney = () => {
  const depositBtn = document.querySelector(".balance-container > button");

  depositBtn.addEventListener("click", () => {
    const leftMoney = getLeftMoney();
    if (!leftMoney) {
      alert("잔액을 확인해주세요.");
    } else {
      const myMoney = getLocalStorageMoney();
      localStorage.setItem("money", myMoney + leftMoney);

      const myMoneyNode = getMyMoneyNode();
      attachNode(myMoneyNode, makeKoreaUnit(myMoney, leftMoney));

      alert("거스름돈 반환이 정상적으로 처리되었습니다. 소지금을 확인하세요.");
      getLeftMoneyNode().innerHTML = "0 원";
    }
  });
};
