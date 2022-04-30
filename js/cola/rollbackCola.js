import { getLocalStorageMoney } from "../common/localstorage.js";
import { getMiniDisplay } from "../display/miniDisplay.js";
import { depositAdd } from "../money/depositMoney.js";
import { getColaCount, getColaName, getColaPriceByName } from "./checkCola.js";
import manageCola from "./manageCola.js";
import { getColaIndexNode } from "../common/extract.js";

export const subtractColaCount = (colaBtn) => {
  const count = getColaCount(colaBtn);
  colaBtn.children[2].innerHTML = count - 1;
};

export const rollbackCola = () => {
  const miniDisplay = getMiniDisplay();

  miniDisplay.addEventListener("click", (e) => {
    if (e.target === miniDisplay) {
      return false;
    }

    // 미니디스플레이 콜라 버튼
    let colaBtn =
      e.target.tagName === "BUTTON" ? e.target : e.target.parentElement;

    const colaPrice = getColaPriceByName(getColaName(colaBtn));
    depositAdd(colaPrice);
    // localStorage.setItem("money", getLocalStorageMoney() + colaPrice);

    const colaCount = getColaCount(colaBtn);
    if (colaCount > 1) {
      // colaBtn.addEventListener("click", subtractColaCount(colaBtn));
      colaBtn.removeEventListener("click", subtractColaCount(colaBtn));
    } else {
      miniDisplay.removeChild(colaBtn.parentElement);
    }

    // 콜라 상태 관리
    const colaName = getColaName(colaBtn);
    manageCola.add(colaName);
    const index = getColaIndexNode(".menu-item", colaName);

    // 콜라 자판기 버튼
    const colaItemBtn = document.querySelector(
      `.list-menu > li:nth-of-type(${index + 1}) > button`
    );

    colaItemBtn.classList.remove("sold-out");

    // //콜라 상태 관리
  });
};
