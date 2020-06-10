var db = require('../db')();
var model = null;
function initModel() {
  db.run("CREATE TABLE IF NOT EXISTS pesronas(id INTEGER PRIMARY KEY AUTOINCREMENT, numeroidentidad TEXT, nombre TEXT, edad INTEGER, genero TEXT, correo TEXT, telefono TEXT)");
  model = {};
  model.getAll = function (handler) {
    db.all("SELECT * from pesronas;",
      function (err, rows) {
        if (err) {
          return handler(err, null);
        } else {
          console.log(rows);
          return handler(null, rows);
        }
      }
    )
  }

  model.getOne = function (id, handler) {
    db.get("SELECT * from pesronas where id = ?;", [id],
      function (err, row) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, row || {});
        }
      }
    )
  }
  // numeroidentidad, nombre, edad, genero, correo, telefono
  model.addOne = function (numeroidentidad, nombre, edad, genero, correo, telefono, handler) {
    db.run(
      "INSERT INTO pesronas (numeroidentidad, nombre, edad, genero, correo, telefono) VALUES (?, ?, ?, ?, ?, ?);",
      [numeroidentidad, nombre, edad, genero, correo, telefono],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  model.updateOne = function (id, numeroidentidad, nombre, edad, genero, correo, telefono, handler) {
    db.run(
      "UPDATE pesronas set numeroidentidad = ?, nombre = ?, edad = ?, genero = ?, correo = ? , telefono = ? where id = ?;",
      [numeroidentidad, nombre, edad, genero, correo, telefono, id],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  model.deleteOne = function (id, handler) {
    db.run(
      "DELETE from pesronas where id = ?;",
      [id],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  return model;
}

module.exports = function () {
  if (!model) {
    return initModel();
  } else {
    return model;
  }
}
