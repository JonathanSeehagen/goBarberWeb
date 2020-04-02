const express = require("express");

//console.log(express);

//Tudo se inicia aqui...

//const app
const server = express(); //abre e fecha parentes é pq está chamando uma função do express

server.use(express.json());

//Query params = ?teste=1

//localhost:3000/teste

/*server.get("/teste", (req, res) => {
  //const pq a variável nunca muda
  const nome = req.query.nome; //
  //return res.send("Hello World!");

  //Template springs: { message: `Hello ${nome}` }

  return res.json({ message: `Hello ${nome}` });
});*/

//Route params = /users/1

//localhost:3000/users/3

/*server.get("/users/:id", (req, res) => {
  //const pq a variável nunca muda
  //const id = req.params.id;
  const { id } = req.params; //desestruturação
  //return res.send("Hello World!");

  //Template springs: { message: `Hello ${nome}` }

  return res.json({ message: `Buscando o usuário ${id}` });
});*/

//Request body = { "nome": "Jonathan", "email": "jonathanseehagen@gmail.com" }

const users = ["Robson", "Cláudio", "Jonathan"];

// CRUD - Create, Read, Update, Delete

//Rota
//Middleware Global
server.use((req, res, next) => {
  //Middleware de log
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  //return next();

  next();

  //console.log("Finalizou");
  console.timeEnd("Request");
});

server.get("/users", (req, res) => {
  return res.json(users);
});

//Middleware Local
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is requires" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

server.get("/users/:index", checkUserInArray, (req, res) => {
  //const pq a variável nunca muda
  //const id = req.params.id;
  //const { index } = req.params; //desestruturação
  //return res.send("Hello World!");

  //Template springs: { message: `Hello ${nome}` }

  //return res.json(users[index]);
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

//O servidor/API ouça uma porta

server.listen(3001);
