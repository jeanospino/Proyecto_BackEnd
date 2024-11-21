const Sequelize = require('sequelize');

const DB_NAME = 'Biblioteca';

const DB_USER = 'admin';

const DB_PASS = 'Maria0411*';



export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,

    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }

);

async function generateDb() {
    await database.sync()
    console.log('Base de datos y tablas creada');
}

generateDb();