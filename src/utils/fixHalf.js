const fixHalf = (value) => {
  if (!value) {
    return 0;
  }

  const dec = Number(value - Math.floor(value));

  if (!dec) {
    return value;
  }

  let factor = Number(dec < 0.5 && dec > 0 ? 0.5 : 0);
  factor = Number(factor === 0 && dec > 0.5 ? 1 : 0.5);

  return Math.floor(value) + factor;
};

export default fixHalf;
