export default class User {
  constructor() {
    const haveMoney = parseInt(localStorage.getItem("money"));
    if (haveMoney) {
      this.money = haveMoney;
    } else {
      localStorage.setItem("money", 10000);
      this.money = 10000;
    }
  }

  set getOutMoney(money) {
    this.money -= money;
    localStorage.setItem("money", this.money);
  }

  moneyCheck(money) {
    return this.money >= money;
  }
}
