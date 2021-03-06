const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find(user => user.username === username);

  if(!user) {
    return response.status(404).json({error :"user dont exists!"});
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const {name, username} = request.body;
 
  const userAlreadyExistis = users.some(
    (user) => user.username === username
  );

  if(userAlreadyExistis){
    return response.status(400).json({error :"User already exists!"});
  }
  
  var user = {
    id:uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(user);
  return response.status(201).json(user);
});

app.use(checksExistsUserAccount);

app.get('/todos/', (request, response) => {
  const {user} = request;
  return response.status(201).json(user.todos);
});

app.post('/todos', (request, response) => {
  const {title, deadline} = request.body;
  const { user } = request;

  const newtodo = { 
    id: uuidv4(), 
    title,
    done: false, 
    deadline: new Date(deadline), 
    created_at: new Date()
  }

  user.todos.push(newtodo);

  return response.status(201).json(newtodo);
});

app.put('/todos/:id', (request, response) => {
  const {id} = request.params;
  const {title, deadline} = request.body;
  const { user } = request;

  const todo = user.todos.find((todo) => todo.id === id);
  if(!todo){
    return response.status(404).json({error:"Todo dont exists!"})
  }

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.status(200).json(todo);
});

app.patch('/todos/:id/done', (request, response) => {
  const {id} = request.params;
  const { user } = request;

  const todo = user.todos.find((todo) => todo.id === id);
  if(!todo){
    return response.status(404).json({error:"Todo dont exists!"})
  }

  todo.done = true;

  return response.status(200).json(todo);
});

app.delete('/todos/:id', (request, response) => {
  const {id} = request.params;
  const { user } = request;

  const todo = user.todos.find((todo) => todo.id === id);
  if(!todo){
    return response.status(404).json({error:"Todo dont exists!"})
  }

  user.todos.splice(todo,1);

  return response.status(204).send();
});

module.exports = app;