const { IsEmail } = require("sequelize-typescript");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'books',
          'description',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            unique: false,
          },
          { transaction: t },
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('books', 'description', { transaction: t }),
      ]);
    });
  },
};