var express= require('express');
var router = express.Router();
var model = require('./personas.model')();

/* Realizar las rutas establecidas en el init */
router.get('/',(req, res)=>{
  res.status(200).json({"version":"1"});
});


router.get("/all", function(req, res){
  model.getAll(function(err, personas){
      if(err){
          console.log(err);
          return res.status(500).json({"error":"Algo salio mal vuelva a intentar!"});
      } else{
          return res.status(200).json(personas);
      }
  });
  
  }); 
  
  router.get("/one/:id", function(req, res){
  var id = parseInt(req.params.id);
  console.log(id);
  model.getOne(id, function(err, row){
      if(err){
          console.log(err);
          return res.status(500).json({"error":"Algo salio mal vuelva a intentarlo"});
      } else{
          return res.status(200).json(row);
      }
  });
  
  
  }); 
  
  router.post("/new", function(req, res){
   var {numeroidentidad, nombre, edad, genero, correo, telefono } = req.body;
      model.addOne(numeroidentidad, nombre, edad, genero, correo, telefono, function(err, rslt){
         if(err){
           console.log({"Error":err});
           res.status(500).json({"msg":"Algo salio mal vuelva a intentarlo!"})
         } else{
           return res.status(200).json({"msg":"Registro Agregado!"});
         }
      });
  
  });
  
  router.put("/upd/:id", function(req, res){
    var id = parseInt(req.params.id);
    var {numeroidentidad, nombre, edad, genero, correo, telefono } = req.body;
    model.updateOne(id, numeroidentidad, nombre, edad, genero, correo, telefono, (err, rslt)=>{
    if(err){
        console.log(err);
        return res.status(500),json({"error":"Algo salio mal vuelve a intentarlo"});
    } else{
        return res.status(500).json({"msg":"Registro Actualizado!"});
    }
    }); 
    
    });


  router.delete("/del/:id", function(req, res){
  var id = parseInt(req.params.id);
  model.deleteOne(id, (err, rslt)=>{
  if(err){
      console.log(err);
      return res.status(500).json({"error":"Algo salio mal vuelva a intentarlo!"});
  } else{
      return res.status(500).json({"msg":"Registro Eliminado!"});
  }
  });
  
  });
module.exports = router;
