// 출처
// https://stackoverflow.com/questions/6405165/how-to-change-a-pseudo-class-style-through-javascript

// 사용법
// pseudoClassControll(
//   ".list-menu > li:first-of-type > button::before",
//   "display: inline;"
// );

// 해석
// .list-menu > li:first-of-type > button::before 의 display 속성을 inline으로 변경한다.
export function pseudoClassControll(sel, css) {
  let S = document.styleSheets[document.styleSheets.length - 1];
  var r = S.cssRules != undefined ? S.cssRules : S.rules;
  if (S.insertRule) S.insertRule(sel + "{" + css + "}", r.length);
  else if (S.addRule) S.addRule(sel, css, r.length);
}
