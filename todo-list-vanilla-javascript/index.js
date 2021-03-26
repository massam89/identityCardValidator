const express = require('express');
const exphbs = require('express-handlebars');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql')
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'masoud',
  password: 'masoudvash',
  database: 'todo'
});

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  queryText = `SELECT * FROM todolist`

  connection.query(queryText, function (error, results, fields) {
    if (error) throw error;
    res.render('home', { item: results });

  });
});

app.post('/addTodo', (req, res) => {
  const id = uuidv4();
  const queryText = `INSERT INTO todolist(id, todoText) VALUES(?, ?)`

  connection.query(queryText, [id, req.body.todoText], function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.redirect('/')
  });
})

app.delete('/deleteTodo/:id', (req, res) => {
  const queryText = "DELETE FROM todolist WHERE id = '" + req.params.id + "'";
  console.log(queryText)
  connection.query(queryText, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send({ "salam": "good" })
  });
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });