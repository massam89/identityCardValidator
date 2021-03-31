const express = require('express');
const exphbs = require('express-handlebars');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql')
const app = express();
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'todo'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  queryText = `SELECT * FROM todolist`

  connection.query(queryText, function (error, results, fields) {
    if (error) throw error;

    for (i = 0; i < results.length; i++) {
      if (results[i].status == 1) {
        results[i].status = 'checked';
      } else {
        results[i].status = '';
      }
    }

    res.render('home', { item: results });

  });
});

app.post('/addTodo', (req, res) => {
  if (req.body.todoText !== '') {
    const id = uuidv4();
    const queryText = `INSERT INTO todolist(id, todoText) VALUES(?, ?)`

    connection.query(queryText, [id, req.body.todoText], function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
})

app.delete('/deleteTodo/:id', (req, res) => {
  const queryText = "DELETE FROM todolist WHERE id = '" + req.params.id + "'";

  connection.query(queryText, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send({ status: 'done' })
  });
})

app.put('/changeStatus/:id', (req, res) => {
  const queryText = `UPDATE todolist SET status = ${req.body.status} WHERE id = '${req.params.id}'`
  connection.query(queryText, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send({ status: 'done' })
  });
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });