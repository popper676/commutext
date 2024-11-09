const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('communication_manager'),
        name: 'communication_manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('content_moderator'),
        name: 'content_moderator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('language_specialist'),
        name: 'language_specialist',
        createdAt,
        updatedAt,
      },

      { id: getId('user_support'), name: 'user_support', createdAt, updatedAt },

      { id: getId('basic_user'), name: 'basic_user', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'texts',
      'translations',
      'roles',
      'permissions',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('language_specialist'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('user_support'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('user_support'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('basic_user'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('CREATE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('READ_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('UPDATE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('DELETE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('CREATE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('READ_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('UPDATE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('DELETE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('language_specialist'),
        permissionId: getId('CREATE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('language_specialist'),
        permissionId: getId('READ_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('language_specialist'),
        permissionId: getId('UPDATE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('user_support'),
        permissionId: getId('READ_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('user_support'),
        permissionId: getId('UPDATE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('basic_user'),
        permissionId: getId('READ_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('basic_user'),
        permissionId: getId('UPDATE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('CREATE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('READ_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('UPDATE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('DELETE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('CREATE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('READ_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('UPDATE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('DELETE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('language_specialist'),
        permissionId: getId('CREATE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('language_specialist'),
        permissionId: getId('READ_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('language_specialist'),
        permissionId: getId('UPDATE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('user_support'),
        permissionId: getId('READ_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('user_support'),
        permissionId: getId('UPDATE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('basic_user'),
        permissionId: getId('READ_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('basic_user'),
        permissionId: getId('UPDATE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('communication_manager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_moderator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('language_specialist'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('user_support'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('basic_user'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_TEXTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_TEXTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_TEXTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_TEXTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_TRANSLATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_TRANSLATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_TRANSLATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_TRANSLATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'communication_manager',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'content_moderator',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
