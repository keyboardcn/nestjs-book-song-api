module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                AutoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.sequelize.query(`
            INSERT INTO "users" (id, firstname, lastname, email, password, "createdAt", "updatedAt")
            SELECT
            id,
            firstname,
            lastname,
            email,
            password,
            "createdAt",
            "updatedAt"
            FROM authors;
        `);
        await queryInterface.addColumn('authors', 'user_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.sequelize.query(`
            UPDATE authors
            SET user_id = id
            WHERE user_id IS NULL;
        `);
        await queryInterface.changeColumn(
            'authors',
            'user_id',
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'                
            }
        )
        await queryInterface.removeColumn('authors', 'firstname');
        await queryInterface.removeColumn('authors', 'lastname');
        await queryInterface.removeColumn('authors', 'email');
        await queryInterface.removeColumn('authors', 'password');
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('authors', 'user_id');
        await queryInterface.addColumn('authors', 'firstname', {
            type: Sequelize.STRING,
            allowNull: false, // Assuming original constraint
            });
            await queryInterface.addColumn('authors', 'lastname', {
            type: Sequelize.STRING,
            allowNull: false, // Assuming original constraint
            });
            await queryInterface.addColumn('authors', 'email', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true, // Assuming original constraint
            });
            await queryInterface.addColumn('authors', 'password', {
            type: Sequelize.STRING,
            allowNull: false, // Assuming original constraint
            });     
        await queryInterface.dropTable('users');
    }
}