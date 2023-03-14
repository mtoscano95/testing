const router = require('express').Router();
const {Table} = require('../db/indexdb');

router.get('/', async(req, res, next)=>{
    try{
        res.send(await Table.findAll());
    }
    catch(er){
        next(er);
    }
})

router.get('/:id', async(req, res, next)=>{
    try{
        res.send(await Table.findByPk(req.params.id));
    }
    catch(er){
        next(er);
    }
})


module.exports = router;