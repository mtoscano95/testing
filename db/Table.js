const Sequelize = require('sequelize');
const {STRING, UUID, UUIDV4} = Sequelize;
const db = require('./db');

const Table = db.define('table',{
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: STRING,
        allowNull: false,
        defaultValue: 'hey'
    }
});

module.exports = Table;
