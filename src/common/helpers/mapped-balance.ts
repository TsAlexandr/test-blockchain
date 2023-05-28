import BigNumber from 'bignumber.js';

export const mappedBalance = (tokens, balance, currentPrice) => {
  return tokens.map((value) => {
    const returningValue = (balance * currentPrice.usd) / value.usd;
    BigNumber.config({ DECIMAL_PLACES: value.decimals });
    const result = new BigNumber(returningValue);
    return `${value.symbol}: ` + result;
  });
};
