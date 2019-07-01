const { UserInputError } = require('apollo-server-koa');
const { transaction } = require('objection');
const _ = require('lodash');
const ymlreq = require('require-yml');
const faker = require('faker');

const Rocks = require('./Rocks');
const { Tools } = require('../models');

const STORE = ymlreq('./assets/store.yml');

class _Tools {
  static async get(params) {
    return Tools.query()
      .where(params)
      .first();
  }

  static async insert(tool) {
    return Tools.query().returning('*').insert(tool);
  }

  static async all(params) {
    return Tools.query().where(params);
  }

  static async mineRock(account, params) {
    const { id: account_id } = account;
    const tool = await this.get(params);


    const rocks = ['stone', 'obsidian', 'emerald', 'diamond'].map(rock => {
      return {
        account_id,
        name: rock,
        count: _.random(0, tool.power),
      };
    });

    // TODO: make this pull from something less static (like a file)
    // TODO: make this actually use the tool's modifiers

    const created = await Rocks.deposit(rocks);

    return created;
  }

  /**
   * This method will purchaes a tool for an account.
   * This will purchase just the base tool, and the player can
   * then craft anything they desire onto the tool.
   * This is the starting point for most crafts, and can probably
   * apply modifiers later on.
   * This will only drop white bases.
   * @param { id } account 
   * @param {*} param1 
   */
  static async purchaseTool(account, { shop_idx }) {

    const item = STORE.items[shop_idx];
    if (!item) throw new UserInputError('Item not found');

    const rocks = await Rocks.all({ account_id: account.id });

    const tool = {
      account_id: account.id,
      name: faker.lorem.words(2),
      power: item.power,
    };

    // TODO: get cost of item from shop
    // TODO: subtract cost of item from current account

    return await this.insert(tool);
  }
  
  static async deleteTool(account, { tool_id }) {
    const tool = await this.get({ id: tool_id, account_id: account.id });
    if (!tool) throw new UserInputError('Tool not found');

    await tool.$query().delete();

    return tool;
  }
}


module.exports = _Tools;