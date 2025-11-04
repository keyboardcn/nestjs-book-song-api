module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'authors',
          'password',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            unique: false,
          },
          { transaction: t },
        ),
        queryInterface.sequelize.query(
          `UPDATE authors SET password = '12345678' WHERE password IS NULL;`,
          { transaction: t },
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('authors', 'password', { transaction: t }),
      ]);
    });
  },
};