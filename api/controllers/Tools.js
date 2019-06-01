const { UserInputError } = require('apollo-server-koa');
const { transaction } = require('objection');
const _ = require('lodash');
const ymlreq = require('require-yml');
const faker = require('faker');

const Rocks = require('./Rocks');
const { Tools } = require('../models');
const ModifierSelector = require('../models/Modifiers');

const STORE = ymlreq('./assets/store.yml');

class _Tools {
  static async get(params) {
    return Tools.query()
      .where(params)
      .first();
  }

  static async insert(tool) {
    return Tools.query().returning('*').insert(tool);
  };

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
    })

    const created = await Rocks.deposit(rocks);

    return created;
  }

  static getStore() {
    console.log(STORE);
    return STORE.items;
  }

  static async purchaseTool(account, { shop_idx }) {

    const item = STORE.items[shop_idx];
    if (!item) throw new UserInputError('Item not found');

    const rocks = await Rocks.all({ account_id: account.id });
    console.log(rocks);
    console.log(item.costs);

    const tool = {
      account_id: account.id,
      name: faker.lorem.words(2),
      power: item.power,
    }

    return await this.insert(tool);
  }
  
  static async deleteTool(account, { tool_id }) {
    const tool = await this.get({ id: tool_id, account_id: account.id });
    if (!tool) throw new UserInputError('Tool not found');

    await tool.$query().delete();

    return tool;
  }
}


_Tools.getStore();

module.exports = _Tools;