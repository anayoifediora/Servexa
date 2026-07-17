//Price formatter
//Assumes no Service price is greater than $9,999
export const priceFormatter = (number) => {
  let string;

  if (number > 999 && number <= 9999.99) {
    string = String(number);

    const firstDigit = string.slice(0, 1).padEnd(2, ',');
    const remainingDigits = string.slice(1);

    return firstDigit.concat(remainingDigits);
  }

  if (number > 9999.99 && number <= 999999.99) {
    return `${(number / 1000).toFixed(0)}k`;
  }

  if (number > 999999.99) {
    return `${(number / 1000000).toFixed(2)}m`;
  }

  return number;
};

export const ROWS_PER_TABLE_PAGE = 10;

export const STATUS_STYLES = {
  'Pending Review': { bg: '#FEF3C7', text: '#92400E' },
  'Payment Pending': { bg: '#FFEDD5', text: '#9A3412' },
  Rejected: { bg: '#FEE2E2', text: '#991B1B' },
  'In Progress': { bg: '#DBEAFE', text: '#1E40AF' },
  Completed: { bg: '#DCFCE7', text: '#166534' },
  Closed: { bg: '#F3F4F6', text: '#374151' },
};
