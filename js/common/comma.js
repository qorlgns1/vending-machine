export const comma = {
  change: (num) => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  },
  remove: (num) => {
    let validation = parseInt(num.toString().replace(",", ""));

    if (isNaN(validation)) {
      return 0;
    } else {
      return validation;
    }
  },
};
