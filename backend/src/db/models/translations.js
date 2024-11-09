const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const translations = sequelize.define(
    'translations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      original_text: {
        type: DataTypes.TEXT,
      },

      translated_text: {
        type: DataTypes.TEXT,
      },

      source_language: {
        type: DataTypes.ENUM,

        values: ['english', 'chinese', 'tamil'],
      },

      target_language: {
        type: DataTypes.ENUM,

        values: ['english', 'chinese', 'tamil'],
      },

      translated_on: {
        type: DataTypes.DATE,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  translations.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.translations.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.translations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.translations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return translations;
};
