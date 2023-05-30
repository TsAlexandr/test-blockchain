import BigNumber from 'bignumber.js';

export const mappedBalance = (tokens, balance, currentPrice) => {
  /*const returningObject = {};
  tokens.map((value) => {
    const returningValue = (balance * currentPrice) / value.usd;
    BigNumber.config({ DECIMAL_PLACES: value.decimals });
    const result = new BigNumber(returningValue);
    returningObject[value.symbol] = result;
  });
  return JSON.parse(JSON.stringify(returningObject));*/

  return tokens.reduce(function (result, item) {
    const returningValue = (balance * currentPrice) / item.usd;
    BigNumber.config({ DECIMAL_PLACES: item.decimals });
    result[item.symbol] = new BigNumber(returningValue);
    return result;
  }, {});
};
