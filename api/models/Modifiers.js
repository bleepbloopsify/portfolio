const _ = require('lodash');
const ymlreq = require('require-yml');
const { modifiers } = ymlreq('./assets/modifiers.yml');

const MAX_MODIFIERS = 8;

class ModifierSelector {

  constructor() {
    const bound = modifiers.reduce((acc, { likelihood }) => acc + likelihood, 0);
    const weighted_selector = this.weighted_selector = new Array(bound);
    let current = 0;
    modifiers.forEach(modifier => {
      weighted_selector.fill(modifier, current, current + modifier.likelihood);
      // When `fill` gets passed an object, it will copy the reference and fill the array with references to that object.
      current += modifier.likelihood;
    });
  }

}

module.exports = new ModifierSelector();