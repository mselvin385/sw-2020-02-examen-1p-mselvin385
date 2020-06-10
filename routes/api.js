var express= require('express');
var router = express.Router();

var personasRouter = require('./personas/personas');

router.use('/personas', personasRouter);

module.exports = router;
