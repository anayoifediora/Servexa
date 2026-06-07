//Price formatter
//Assumes no price is greater than $9,999
export const priceFormatter = (number) => {
  let string = String(number);
  if (string.length === 4) {
    let end = string.slice(1);
    let start = string.slice(0, 1);

    return `${start},${end}`;
  }

  return string;
};
