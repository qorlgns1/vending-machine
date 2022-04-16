import { getLeftMoney, depositSubtract } from "../money/depositMoney.js";
import { getColaName, getColaPrice, getColaCount } from "./checkCola.js";
import { copyDisplayColaBtn } from "../component/colaButton.js";
import { getMiniDisplay } from "../display/miniDisplay.js";
import manageCola from "./manageCola.js";
import { pseudoClassControll } from "../common/pseudoClassControll.js";
import { getColaIndexNode } from "../common/extract.js";

// export const subtractDeposit = () => {
//   콜라의 가격을 가지고 온다.
//   디파짓에서 콜라의 가격을 뺀다.
//   뺸 금액을 디파짓에 보여준다.
// }

export const insertCola = () => {
  const cola = document.querySelectorAll(".list-menu .menu-item");

  cola.forEach((colaBtn) => {
    colaBtn.addEventListener("click", (e) => {
      const deposit = getLeftMoney();

      if (deposit < 1000) {
        alert("잔액을 확인해주세요.");
      } else {
        let miniDisplay = getMiniDisplay();
        const colaName = getColaName(colaBtn);

        // 콜라 상태 관리
        if (manageCola.get(colaName) === 0) {
          alert("품절입니다. 다른 상품을 선택해주세요.");
          return;
        }

        let manageColaCount = manageCola.sub(colaName);
        if (manageColaCount === 0) {
          const index = getColaIndexNode(".menu-item", colaName);

          pseudoClassControll(
            `.list-menu > li:nth-of-type(${index + 1}) > button::before`,
            "display: inline;"
          );
        }
        // //콜라 상태 관리

        let flag = false;
        Array.from(miniDisplay.children).forEach((displayLi) => {
          let displayBtn = displayLi.children[0];

          if (getColaName(displayBtn) === colaName) {
            displayBtn.children[2].innerHTML = getColaCount(displayBtn) + 1;
            flag = true;
          }
        });

        if (!flag) {
          const displayColaBtn = copyDisplayColaBtn(colaBtn);
          miniDisplay.append(displayColaBtn);
        }

        depositSubtract(getColaPrice(colaBtn));
      }
    });
  });
};
