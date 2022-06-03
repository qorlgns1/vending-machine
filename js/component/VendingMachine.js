export default class VendingMachine {
  #balance = 0;
  balanceBox = document.querySelector(".my-left-money").children[1];
  menuList = document.querySelector(".list-menu").children;
  miniDisplay = document.querySelector(".mini-display");

  constructor(data) {
    this.data = data;
  }

  set insertMoney(money) {
    this.#balance += money;
    this.showBalance();
  }

  itemPriceCheck(price) {
    return this.#balance >= price;
  }

  showBalance() {
    this.balanceBox.innerText = this.#balance.toLocaleString() + " 원";
  }

  buy(itemInfo) {
    const { name, price } = itemInfo;
    let itemCount = this.data[name];

    if (price > this.#balance) {
      alert("잔액이 부족합니다.");
      return;
    }

    if (!itemCount) {
      alert("재고가 없습니다.");
      return;
    }

    itemCount -= 1;
    this.data[name] = itemCount;
    this.#balance -= price;
    this.showBalance();

    const itemButton = this.findItemButton(name);
    if (!itemCount) {
      itemButton.classList.add("sold-out");
    }

    this.addItemToMiniDisplay(itemButton);
  }

  // 미니 디스플레이창에 콜라 버튼 누른게 존재하는지 체크
  miniDisplayHasColaCheck(name) {
    const alreadyItem = Array.prototype.find.call(
      this.miniDisplay.children,
      (itemLi) => {
        const [itemButton] = itemLi.children;
        const [, buttonName] = itemButton.children;
        return name === buttonName.innerText;
      }
    );

    return alreadyItem;
  }

  addItemToMiniDisplay(itemButton) {
    const itemName = this.findNameByItemButton(itemButton);
    const alreadyItem = this.miniDisplayHasColaCheck(itemName);
    if (alreadyItem) {
      const [button] = alreadyItem.children;
      const [, , itemCountBox] = button.children;
      const itemCount = parseInt(itemCountBox.innerText);
      itemCountBox.innerText = itemCount + 1;
    } else {
      const [img, nameBox] = itemButton.children;
      const itemInfo = {
        imageSrc: img.src,
        name: nameBox.innerText,
        count: 1,
      };

      this.miniDisplay.appendChild(this.makeMiniDisplayItemButton(itemInfo));
    }
  }

  findNameByItemButton(itemButton) {
    const [, nameBox] = itemButton.children;
    return nameBox.innerText;
  }

  returnMoney(user) {
    const localStorageMoney = parseInt(localStorage.getItem("money"));
    localStorage.setItem("money", localStorageMoney + this.#balance);
    user.money += this.#balance;
    this.#balance = 0;
    this.showBalance();
  }

  koreanCurrencyUnit(money) {
    return `${money} 원`;
  }

  findItemButton(name) {
    const li = Array.prototype.find.call(this.menuList, (li) => {
      const [button] = li.children;
      const [, nameBox] = button.children;
      return nameBox.innerText === name;
    });

    return li.children[0];
  }

  makeMiniDisplayItemButton = (itemInfo) => {
    const { name, count, imageSrc } = itemInfo;

    const li = document.createElement("li");

    const button = document.createElement("button");
    button.setAttribute("type", "button");

    const itemImg = document.createElement("img");
    itemImg.setAttribute("src", imageSrc);

    const itemName = document.createElement("span");
    itemName.setAttribute("class", "item-name");
    itemName.innerText = name;

    const itemCount = document.createElement("span");
    itemCount.setAttribute("class", "item-count");
    itemCount.innerText = count;

    button.append(itemImg, itemName, itemCount);
    li.appendChild(button);

    return li;
  };
}
