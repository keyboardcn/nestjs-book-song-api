const { IsEmail } = require("sequelize-typescript");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'authors',
          'email',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            unique: false,
          },
          { transaction: t },
        ),

        queryInterface.sequelize.query(
          `UPDATE authors SET email = CONCAT(SUBSTRING(firstname, 1, 3), id, '@example.com') WHERE email IS NULL;`,
          { transaction: t },
        ),

        queryInterface.changeColumn(
          'authors',
          'email',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            IsEmail: true,
            unique: false,
          },
          { transaction: t },
        ),

        queryInterface.addConstraint('authors', {
          fields: ['email'],
          type: 'unique',
          name: 'unique_author_email_constraint',
          transaction: t,
        }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('authors', 'email', { transaction: t }),
      ]);
    });
  },
};