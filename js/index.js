import { makeItemButton } from "./component/buttons/vendingMachineItem.js";
import User from "./component/User.js";
import VendingMachine from "./component/VendingMachine.js";

// Selectors
const menuList = document.querySelector(".list-menu");
const insertMoneyButton = document.querySelector(".insert-money-btn");
const returnMoneyButton = document.querySelector(
  ".balance-container > .mini-btn"
);

// Create Instances
let vendingMachine = new VendingMachine();
const user = new User();

// Events
menuList.addEventListener("click", handleItemButtonClick);
insertMoneyButton.addEventListener("click", handleInsertMoneyButton);
returnMoneyButton.addEventListener("click", handleReturnMoneyButton);

// Init
(function init() {
  myMoneyBoxUpdate(user);

  fetch("./js/api/item/item.json")
    .then((res) => {
      return res.json();
    })
    .then(({ result }) => {
      const frag = new DocumentFragment();
      const saveItemInfo = {};

      result.forEach((itemInfo) => {
        // 콜라 버튼 만들기
        const itemButton = makeItemButton(itemInfo);
        frag.appendChild(itemButton);

        // 로컬스토리지에 콜라개수 저장
        const { name, count } = itemInfo;
        saveItemInfo[name] = count;
      });

      menuList.appendChild(frag);
      vendingMachine.data = saveItemInfo;
    });
})();

function handleItemButtonClick(event) {
  event.preventDefault();

  if (
    event.target.nodeName === "BUTTON" ||
    event.target.parentNode.nodeName === "BUTTON"
  ) {
    let itemButton;
    // 콜라 버튼 찾기
    event.target.nodeName === "BUTTON"
      ? (itemButton = event.target)
      : (itemButton = event.target.parentNode);

    const itemInfo = getItemButtonInfo(itemButton);
    vendingMachine.buy(itemInfo);
  }
}

function handleInsertMoneyButton(event) {
  event.preventDefault();

  let insertMoneyInput = document.querySelector(".insert-money-input");
  let insertMoney = parseInt(insertMoneyInput.value);

  if (!insertMoneyValidationCheck(insertMoney)) {
    insertMoneyInput.value = "";
    return;
  }

  if (!user.moneyCheck(insertMoney)) {
    insertMoneyInput.value = "";
    alert("소지금이 부족합니다.");
    return;
  }

  user.getOutMoney = insertMoney;
  vendingMachine.insertMoney = insertMoney;

  myMoneyBoxUpdate(user);
  insertMoneyInput.value = "";

  alert("입금이 완료되었습니다. 잔액과 소지금을 확인해주세요.");
}

function myMoneyBoxUpdate(user) {
  const showMyMoneyBox = document.querySelector(".my-money > p:last-of-type");
  showMyMoneyBox.innerText = user.money.toLocaleString() + " 원";
}

function handleReturnMoneyButton(event) {
  event.preventDefault();
  vendingMachine.returnMoney(user);
  myMoneyBoxUpdate(user);
}

function insertMoneyValidationCheck(insertMoney) {
  if (!insertMoney) {
    alert("입금액을 입력해주세요.");
    return;
  }

  if (insertMoney <= 0) {
    alert("정상적인 입금액이 아닙니다. 확인해주세요.");
    return;
  }

  return true;
}

function getItemButtonInfo(itemButton) {
  return {
    name: itemButton.children[1].innerText,
    price: parseInt(itemButton.children[2].innerText),
  };
}
