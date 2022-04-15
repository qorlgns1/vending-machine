export const copyDisplayColaBtn = (btn) => {
  let li = document.createElement("li");

  let button = btn.cloneNode(true);
  button.classList.remove(...button.classList);

  let spanTag = button.children[2];
  spanTag.classList.remove("item-price");
  spanTag.classList.add("item-count");
  spanTag.innerText = "1";

  li.appendChild(button);

  return li;
};

export const createBigDisplayCola = (name, count) => {
  let li = document.createElement("li");
  let colaImg = document.createElement("img");
  let colaName = document.createElement("p");
  let colaCount = document.createElement("p");

  colaImg.src = `./images/cola/${name.toLowerCase()}.png`;
  colaImg.alt = name;

  colaName.innerHTML = name;

  colaCount.innerHTML = count;
  colaCount.classList.add("item-count");

  li.appendChild(colaImg);
  li.appendChild(colaName);
  li.appendChild(colaCount);

  return li;
};
