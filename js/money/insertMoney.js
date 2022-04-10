import { makeKoreaUnit, attachNode } from "../common/changeText.js";
import { getLocalStorageMoney } from "../common/localstorage.js";
import { getMyMoneyNode } from "./depositMoney.js";
const insertBtn = document.querySelector(".insert-money-btn");

const leftMoneyChange = (insertMoney) => {
  const leftMoneyNode = document.querySelector(".my-left-money").children[1];
  const leftMoney = leftMoneyNode.innerHTML.split(" ")[0];

  attachNode(leftMoneyNode, makeKoreaUnit(leftMoney, insertMoney));
};

export const insertMoney = () => {
  insertBtn.addEventListener("click", () => {
    let insertMoneyInput = document.querySelector(".insert-money-input");
    let insertMoneyValue = insertMoneyInput.value;
    const myMoney = getLocalStorageMoney();

    if (!insertMoneyValue) {
      alert("입금액을 입력해주세요.");
      return false;
    } else {
      if (myMoney < insertMoneyValue) {
        alert("소지금이 부족합니다.");
        return false;
      } else {
        const totalLeftMoney = myMoney - insertMoneyValue;
        localStorage.setItem("money", totalLeftMoney);

        const myMoneyNode = getMyMoneyNode();
        attachNode(myMoneyNode, makeKoreaUnit(totalLeftMoney));

        leftMoneyChange(insertMoneyValue);
        insertMoneyInput.value = "";
        alert("입금이 완료되었습니다. 잔액과 소지금을 확인해주세요.");
      }
    }
  });
};
