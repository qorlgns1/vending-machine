import { getLeftMoney, depositSubtract } from "../money/depositMoney.js";
import { getColaName, getColaPrice, getColaCount } from "./checkCola.js";
import { copyDisplayColaBtn } from "../component/colaButton.js";
import { getMiniDisplay } from "../display/miniDisplay.js";

// export const subtractDeposit = () => {
//   콜라의 가격을 가지고 온다.
//   디파짓에서 콜라의 가격을 뺀다.
//   뺸 금액을 디파짓에 보여준다.
// }

export const insertCola = () => {
  const cola = document.querySelectorAll(
    ".vending-machine > .list-menu > li > button"
  );

  cola.forEach((colaBtn) => {
    colaBtn.addEventListener("click", (e) => {
      const deposit = getLeftMoney();

      if (deposit < 1000) {
        alert("잔액을 확인해주세요.");
      } else {
        let miniDisplay = getMiniDisplay();

        const colaName = getColaName(colaBtn);
        let flag = false;
        Array.from(miniDisplay.children).forEach((displayBtn) => {
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
