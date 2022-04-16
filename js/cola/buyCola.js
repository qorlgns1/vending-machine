import { getMiniDisplay } from "../display/miniDisplay.js";
import { getBigDisplay } from "../display/bigDisplay.js";
import { getColaCount, getColaName, getColaPriceByName } from "./checkCola.js";
import { createBigDisplayCola } from "../component/colaButton.js";
import { comma } from "../common/comma.js";

export const buyCola = () => {
  const buyBtn = document.querySelector(".get-btn");

  buyBtn.addEventListener("click", () => {
    // 구매한 콜라 전체 개수 세기
    const miniDisplay = getMiniDisplay();
    const bigDisplay = getBigDisplay();

    const colaData = {};
    Array.from(bigDisplay.children).forEach((colaBtn) => {
      const colaName = getColaName(colaBtn);
      const colaCount = getColaCount(colaBtn);

      if (colaData[colaName]) {
        colaData[colaName] = colaData[colaName] + colaCount;
      } else {
        colaData[colaName] = colaCount;
      }
    });

    Array.from(miniDisplay.children).forEach((colaLi) => {
      let colaBtn = colaLi.children[0];

      const colaName = getColaName(colaBtn);
      const colaCount = getColaCount(colaBtn);

      if (colaData[colaName]) {
        colaData[colaName] = colaData[colaName] + colaCount;
      } else {
        colaData[colaName] = colaCount;
      }
    });
    // /구매한 콜라 전체 개수 세기/

    // bigDisplay에 넣기
    while (bigDisplay.hasChildNodes()) {
      bigDisplay.removeChild(bigDisplay.firstChild);
    }
    // bigDisplay에 넣기

    console.log(colaData);

    // 콜라 버튼 만들기
    for (const colaName in colaData) {
      bigDisplay.appendChild(
        createBigDisplayCola(colaName, colaData[colaName])
      );
    }
    // /콜라 버튼 만들기

    // miniDisplay button 삭제
    while (miniDisplay.hasChildNodes()) {
      miniDisplay.removeChild(miniDisplay.firstChild);
    }
    // /miniDisplay button 삭제

    // 잔액 변경하기
    const totalMoneyNode = document.querySelector(
      ".my-bag-container > p:last-of-type"
    );
    let totalColaPrice = 0;
    for (const name in colaData) {
      let price = getColaPriceByName(name);
      totalColaPrice += price * colaData[name];
    }

    totalMoneyNode.innerHTML = `총금액 : ${comma.change(totalColaPrice)} 원`;

    // /잔액 변경하기
  });
};
