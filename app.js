const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
// tools of connection for practice
// Request.http 
const app = express();

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mysql parameters
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "kevin",
  password: "kevin",
  database: "crudtasks",
});


//Select all task in the database
app.get("", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // port of connection 
    console.log(`connectede es id ${connection.threadId}`);

    // query db()
    connection.query("SELECT * FROM tbtask", (err, rows) => {
      connection.release(); // return the connection pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

//get by ID task
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connectede es id ${connection.threadId}`);
  
      // query()
      connection.query("SELECT * FROM tbtask WHERE Idtask= ?", [req.params.id], (err, rows) => {
        connection.release(); // return the connection pool
  
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      });
    });
  });

  //Delete a task / task 
app.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connectede es id ${connection.threadId}`);
  
      // query()
      connection.query("DELETE FROM tbtask WHERE Idtask= ?", [req.params.id], (err, rows) => {
        connection.release(); // return the connection pool
  
        if (!err) {
          res.send(`Task with Id: ${[req.params.id]} has been removed.`);
        } else {
          console.log(err);
        }
      });
    });
  });


//Add task
  app.post('', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connectede es id ${connection.threadId}`);
  
      // query()
      const params = req.body

      connection.query("INSERT INTO tbtask SET ?", params, (err, rows) => {
        connection.release(); // return the connection pool
  
        if (!err) {
          res.send(`Task with name: ${[params.name]} has been added.`);
        } else {
          console.log(err);
        }
      });

      console.log(req.body)
    });
  });

  //Update a record
  app.put('', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connectede es id ${connection.threadId}`);
  
      // query()
const{Idtask, Task, Description} = req.body
      connection.query("UPDATE tbtask SET Task= ? Description= ? WHERE Idtask= ?", [Task, Description ,Idtask], (err, rows) => {
        connection.release(); // return the connection pool
  
        if (!err) {
          res.send(`Task with name: ${Task} has been added.`);
        } else {
          console.log(err);
        }
      });

      console.log(req.body)
    });
  });




//Listen on enviroment port 4000
app.listen(port, () => console.log(`Listen on port ${port}`));
