import Base from './Base';

class Stone extends Base {

  name = 'Stone';
  /**
   * Do not enter this function until we have a transaction on the actual
   * stone ledger for this account. All operations within this should be within
   * a ledger so we cannot accidentally overspend.
   * @param {id} tool - this is a tool
   */
  applyTo(tool) {
    console.log(`Applying stone to tool: ${tool.name}`);

    // TODO: probably something like Tool.randomizeModifiers()
    // TODO: or something like Tool.increaseQuality()
    // TODO: or something more similar to Tool.wipe()
  }
}