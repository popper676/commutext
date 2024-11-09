const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TranslationsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const translations = await db.translations.create(
      {
        id: data.id || undefined,

        original_text: data.original_text || null,
        translated_text: data.translated_text || null,
        source_language: data.source_language || null,
        target_language: data.target_language || null,
        translated_on: data.translated_on || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await translations.setUser(data.user || null, {
      transaction,
    });

    return translations;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const translationsData = data.map((item, index) => ({
      id: item.id || undefined,

      original_text: item.original_text || null,
      translated_text: item.translated_text || null,
      source_language: item.source_language || null,
      target_language: item.target_language || null,
      translated_on: item.translated_on || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const translations = await db.translations.bulkCreate(translationsData, {
      transaction,
    });

    // For each item created, replace relation files

    return translations;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const translations = await db.translations.findByPk(
      id,
      {},
      { transaction },
    );

    await translations.update(
      {
        original_text: data.original_text || null,
        translated_text: data.translated_text || null,
        source_language: data.source_language || null,
        target_language: data.target_language || null,
        translated_on: data.translated_on || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await translations.setUser(data.user || null, {
      transaction,
    });

    return translations;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const translations = await db.translations.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of translations) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of translations) {
        await record.destroy({ transaction });
      }
    });

    return translations;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const translations = await db.translations.findByPk(id, options);

    await translations.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await translations.destroy({
      transaction,
    });

    return translations;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const translations = await db.translations.findOne(
      { where },
      { transaction },
    );

    if (!translations) {
      return translations;
    }

    const output = translations.get({ plain: true });

    output.user = await translations.getUser({
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

      if (filter.original_text) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'translations',
            'original_text',
            filter.original_text,
          ),
        };
      }

      if (filter.translated_text) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'translations',
            'translated_text',
            filter.translated_text,
          ),
        };
      }

      if (filter.translated_onRange) {
        const [start, end] = filter.translated_onRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            translated_on: {
              ...where.translated_on,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            translated_on: {
              ...where.translated_on,
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

      if (filter.source_language) {
        where = {
          ...where,
          source_language: filter.source_language,
        };
      }

      if (filter.target_language) {
        where = {
          ...where,
          target_language: filter.target_language,
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
          count: await db.translations.count({
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
      : await db.translations.findAndCountAll({
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
          Utils.ilike('translations', 'original_text', query),
        ],
      };
    }

    const records = await db.translations.findAll({
      attributes: ['id', 'original_text'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['original_text', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.original_text,
    }));
  }
};
