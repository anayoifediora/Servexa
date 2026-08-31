//Price formatter
export const priceFormatter = (number) => {
  let string;

  if (number > 999 && number <= 9999.99) {
    string = String(number);

    const firstDigit = string.slice(0, 1).padEnd(2, ',');
    const remainingDigits = string.slice(1);

    return firstDigit.concat(remainingDigits);
  }

  if (number > 9999.99 && number <= 999999.99) {
    return `${(number / 1000).toFixed(1)}k`;
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

export const userStatusStyles = {
  'Pending Approval': { bg: '#FEF3C7', text: '#92400E' },
  'De-listed': { bg: '#FEE2E2', text: '#991B1B' },
  Approved: { bg: '#DCFCE7', text: '#166534' },
};
export const activityTime = (date) => {
  const currentDate = Date.now();
  const dateDiff = Math.floor((currentDate - date) / 1000);

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;
  if (dateDiff < 5) {
    return `Just now`;
  }
  if (dateDiff < minute) {
    return `${dateDiff} ${dateDiff === 1 ? 'second' : 'seconds'} ago`;
  }

  if (dateDiff < hour) {
    const mins = Math.floor(dateDiff / minute);
    return `${mins} ${mins === 1 ? 'min' : 'mins'} ago`;
  }

  if (dateDiff < day) {
    const hours = Math.floor(dateDiff / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  if (dateDiff < week) {
    const days = Math.floor(dateDiff / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  if (dateDiff < month) {
    const weeks = Math.floor(dateDiff / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }

  if (dateDiff < year) {
    const months = Math.floor(dateDiff / month);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  const years = Math.floor(dateDiff / year);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};

export const activityFeedIcon = (remark) => {
  const array = remark.split(' ');
  if (array.includes('Payment')) {
    return {
      icon: 'bi bi-coin',
      color: '#166534',
      bg: '#DCFCE7',
    };
  } else if (array.includes('signed')) {
    return {
      icon: 'bi bi-person',
      color: '#9A3412',
      bg: '#FFEDD5',
    };
  } else if (array.includes('created')) {
    return {
      icon: 'bi bi-file-earmark-check',
      color: '#991B1B',
      bg: '#FEE2E2',
    };
  } else if (array.includes('status')) {
    return {
      icon: 'bi bi-person-fill',
      color: '#92400E',
      bg: '#FEF3C7',
    };
  } else {
    return {
      icon: 'bi bi-file-earmark-text',
      color: '#1E40AF',
      bg: '#DBEAFE',
    };
  }
};
