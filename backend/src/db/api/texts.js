const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TextsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const texts = await db.texts.create(
      {
        id: data.id || undefined,

        content: data.content || null,
        language: data.language || null,
        created_on: data.created_on || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await texts.setUser(data.user || null, {
      transaction,
    });

    return texts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const textsData = data.map((item, index) => ({
      id: item.id || undefined,

      content: item.content || null,
      language: item.language || null,
      created_on: item.created_on || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const texts = await db.texts.bulkCreate(textsData, { transaction });

    // For each item created, replace relation files

    return texts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const texts = await db.texts.findByPk(id, {}, { transaction });

    await texts.update(
      {
        content: data.content || null,
        language: data.language || null,
        created_on: data.created_on || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await texts.setUser(data.user || null, {
      transaction,
    });

    return texts;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const texts = await db.texts.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of texts) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of texts) {
        await record.destroy({ transaction });
      }
    });

    return texts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const texts = await db.texts.findByPk(id, options);

    await texts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await texts.destroy({
      transaction,
    });

    return texts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const texts = await db.texts.findOne({ where }, { transaction });

    if (!texts) {
      return texts;
    }

    const output = texts.get({ plain: true });

    output.user = await texts.getUser({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('texts', 'content', filter.content),
        };
      }

      if (filter.created_onRange) {
        const [start, end] = filter.created_onRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            created_on: {
              ...where.created_on,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            created_on: {
              ...where.created_on,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.language) {
        where = {
          ...where,
          language: filter.language,
        };
      }

      if (filter.user) {
        const listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.texts.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.texts.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('texts', 'content', query),
        ],
      };
    }

    const records = await db.texts.findAll({
      attributes: ['id', 'content'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['content', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.content,
    }));
  }
};
