const db = require('./db');
const Table = require('./Table');

const seed = async() => {
    await db.sync({force: true});
    await Promise.all([
        Table.create({name: 'hey', description: "boo"}),
        Table.create({name: 'doo', description: "flee"}),
        Table.create({name: 'that', description: "foo"}),
        Table.create({name: 'thing', description: "taa"})
    ])
}

module.exports = seed;