/* Step 1: Create your express app, bring in Sequelize and create your table

const Sequelize = require('sequelize');
const {STRING, UUID, UUIDV4} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/testing');

const Table = conn.define('table',{
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

const express = require('express');
const app = express();

const port = process.env.PORT || 3000

app.listen(port, async()=>{
    try{
        await conn.sync({force: true});
        await Promise.all([
            Table.create({name: 'hey', description: "boo"}),
            Table.create({name: 'doo', description: "flee"}),
            Table.create({name: 'that', description: "foo"}),
            Table.create({name: 'thing', description: "taa"})
        ])
        console.log(`listening on ${port}`);
    }
    catch(er){
        console.log(er);
    }
})

*/

/* Step 2: Set up your get routes. 

*****For ID we notice it will only work with a "#", how do we fix this?
    - ADDRESS LATER
****


const Sequelize = require('sequelize');
const {STRING, UUID, UUIDV4} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/testing');

const Table = conn.define('table',{
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

const express = require('express');
const app = express();


app.get('/api/testing', async(req, res, next)=>{
    try{
        res.send(await Table.findAll());
    }
    catch(er){
        next(er);
    }
})

app.get('/api/testing/:id', async(req, res, next)=>{
    try{
        res.send(await Table.findByPk(req.params.id));
    }
    catch(er){
        next(er);
    }
})

const port = process.env.PORT || 3000

app.listen(port, async()=>{
    try{
        await conn.sync({force: true});
        await Promise.all([
            Table.create({name: 'hey', description: "boo"}),
            Table.create({name: 'doo', description: "flee"}),
            Table.create({name: 'that', description: "foo"}),
            Table.create({name: 'thing', description: "taa"})
        ])
        console.log(`listening on ${port}`);
    }
    catch(er){
        console.log(er);
    }
})

*/

/* Step 3: Break out your data into folders (DB and Public)

DB FOLDER
db.js
- since this is your DB, you will need
    - Sequelize
    -your seq connection
    -export db

Test.js
- since this is where your table is made you will need
    -sequelize and your db
    - table
    -export table

seed.js
- since this is where your data is being seeded you will need
    - db
    - Table required
    - seed function taken from app.listen
    - export seed

ROUTES FOLDER
- make a file and ensure you have a router variable made
-ensure you bring in the name of the table you made
- export the router

YOUR SERVER FILE AT THE END:
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/testing', require('./routes/test'));

const port = process.env.PORT || 3000

app.listen(port, async()=>{
    try{
        console.log(`listening on ${port}`);
    }
    catch(er){
        console.log(er);
    }
})

*/

/* Step 4: Make an HTML file and add middleware to bring that in (path variable and the get route)


const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use('/api/testing', require('./routes/test'));
app.get('/', (req, res)=>res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 3000

app.listen(port, async()=>{
    try{
        console.log(`listening on ${port}`);
    }
    catch(er){
        console.log(er);
    }
})


*/

/* Step 5: Install webpack (stitches file together for us)

- install it -> npm i webpack webpack-cli --save-dev
-./node_modules/.bin/webpack (will give error, looking for starting source in directory called source)
-mkdir called src, add an index.js file to it
- we run ./node_modules/.bin/webpack again and it makes a dist folder for us with that same console.log
- as an exmaple we made a file called foo.js under src. in that file we make a function return some phrase. We then EXPORT DEFAULT that function
- we go to the index.js file and we put import import from './food' and console.log it
- we then go to our HTML file and add the script with the /dist/main.js as the source with defer
- we add middleware to pull in dist in server.js file

EVERYTIME YOU MAKE A CHANGE RUN WEBPACK

INDEX.JS SRC FILE

import foo from './foo';
import bar from './bar';

console.log(`${foo()} and ${bar()}`);


SERVER FILE
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use('/api/testing', require('./routes/test'));

app.get('/dist', express.static('dist'));

app.get('/', (req, res)=>res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 3000

app.listen(port, async()=>{
    try{
        console.log(`listening on ${port}`);
    }
    catch(er){
        console.log(er);
    }
})

*/

/* Step 6: We then will write JSX and put it into our index.js file under src. Need to turn this file into javascript

How do we conver to javascript?
- babel

We will need a loader - babel loader (install it first)
- 3 dependencies we'll need 
        touch webpack.config.js. in this file
            module.exports = {
                module:{
                    rules: [
                        {
                            test: /\.js$/,
                            loader: 'babel-loader',
                        }
                    ]
                }
            }
            - webpack can process CSS, images, etc
            - run webpack again
        1) babel loader (npm i babel-loader) 
        2) npm i @babel/core (core library)
        3) npm i @babel/preset-react --save-dev
- last thing we need to do is define the options within the index.js file

- we run webpack again

*/

/* Step 7: Use React to make your app fetch and render

1) install react, reactDom and axios
 (npm i react --save-dev, npm i react-dom --save-dev, etc)
 (go into your package.json and make sure you have scripts update - "watching")
            - build: webpack
                - when we deploy app, we want to run webpacl
            - build:dev: npm run build -- --watch --mode=development
                -while were developing we want to watch the file and show were developing through the mode

            - we need to ignore src and dist, then run build div (front end - is taking code we write and putting it in form that can be used in browser)

2) we go into our index.js file under src and start building out
            - import axios, react and the createRoot object

    import axios from 'axios';
    import React from 'react';
    import { createRoot } from 'react-dom/client'

3) We will the need to
    1) create a function that will 1) fetch data and 2) render it
    2) create our root and render it
            we will also need to make sure our div or parent element has an id that matches our root




    



*/

const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

app.use('/api/testing', require('./routes/test'));

app.use('/dist', express.static('dist'));

app.get('/', (req, res)=>res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 3000

app.listen(port, async()=>{
    try{
        console.log(`listening on ${port}`);
    }
    catch(er){
        console.log(er);
    }
})


