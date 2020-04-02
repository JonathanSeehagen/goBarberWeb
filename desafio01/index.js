const express = require("express");

const server = express(); //abre e fecha parentes é pq está chamando uma função do express

server.use(express.json());

//Methods========================

const projects = [];

server.post("/projects", (req, res) => {
  projects[req.body.id] = req.body;

  return res.json(projects);
});

server.post("/projects/:id/tasks", (req, res) => {
  projects[req.body.id] = req.body;

  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  projects[req.params.id].title = req.body.title;

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  projects.splice(req.params.id, 1);

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.listen(3001);
