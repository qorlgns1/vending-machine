export const makeItemButton = (itemInfo) => {
  const { name, price, imageSrc } = itemInfo;
  const li = document.createElement("li");

  const button = document.createElement("button");
  button.setAttribute("class", "menu-item");
  button.setAttribute("type", "button");

  const itemImg = document.createElement("img");
  itemImg.setAttribute("src", imageSrc);

  const itemName = document.createElement("span");
  itemName.setAttribute("class", "item-name");
  itemName.innerText = name;

  const itemPrice = document.createElement("span");
  itemPrice.setAttribute("class", "item-price");
  itemPrice.innerText = price;

  button.append(itemImg, itemName, itemPrice);
  li.appendChild(button);

  return li;
};
