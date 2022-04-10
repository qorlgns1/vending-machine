import { firstVisitChargeMoney } from "./money/firstChargeMoney.js";
import { insertMoney } from "./money/insertMoney.js";
import { depositMoney } from "./money/depositMoney.js";
import { insertCola } from "./cola/insertCola.js";
import { rollbackCola } from "./cola/rollbackCola.js";
import { buyCola } from "./cola/buyCola.js";

firstVisitChargeMoney();
insertMoney();
depositMoney();
insertCola();
rollbackCola();
buyCola();
