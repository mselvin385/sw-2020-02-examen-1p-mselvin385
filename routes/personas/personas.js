var express= require('express');
var router = express.Router();
var model = require('./personas.model')();

/* Realizar las rutas establecidas en el init */
router.get('/',(req, res)=>{
  res.status(200).json({"version":"1"});
});

module.exports = router;
