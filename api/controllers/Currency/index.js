import Stone from './Stone';

const currencies = [Stone];

module.exports = Object.fromEntries(currencies.map(currency => currency.getName(), currency));