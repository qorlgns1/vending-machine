export const copyDisplayColaBtn = (btn) => {
  let button = btn.cloneNode(true);
  button.classList.remove(...button.classList);
  let pTag = button.children[2];
  pTag.classList.remove("item-price");
  pTag.classList.add("item-count");
  pTag.innerText = "1";

  return button;
};

export const bigDisplayColaBtn = (name, count) => {
  let button = document.createElement("button");
  let colaImg = document.createElement("img");
  let colaName = document.createElement("p");
  let colaCount = document.createElement("p");

  colaImg.src = `./images/cola/${name.toLowerCase()}.png`;
  colaImg.alt = name;

  colaName.innerHTML = name;

  colaCount.innerHTML = count;
  colaCount.classList.add("item-count");

  button.appendChild(colaImg);
  button.appendChild(colaName);
  button.appendChild(colaCount);

  return button;
};
