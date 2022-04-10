import { getLocalStorageMoney } from "../common/localstorage.js";
import { getMiniDisplay } from "../display/miniDisplay.js";
import { depositAdd } from "../money/depositMoney.js";
import { getColaCount, getColaName, getColaPriceByName } from "./checkCola.js";

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
      miniDisplay.removeChild(colaBtn);
    }
  });
};
