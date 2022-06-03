export const makeMiniDisplayColaButton = (itemInfo) => {
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
