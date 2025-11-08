module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'roles', {
            type: Sequelize.STRING,
            allowNull: true
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('users', 'roles');
    }
}