## TodoAPI - Api de tarefas

----------------------------------------------------------------
# Tabelas da API
## Dados usuario
1. username - string.
2. name - string.
3. id - uuid.
4. todos - array.

## Dados tarefa

1. id - uuid.
2. title - string.
3. done: false - boolean.
4. deadline - date.
5. created_at: new Date() - date.
---------------
### Rotas da aplicação
1. [ POST ] /users -
Criar uma usuario na aplicação. passar dados pelo body.
2. [ GET ] /todos -
Receber pelo o header o username e retornar tarefas do usuario.
3. [ POST ] /todos - 
receber titulo da tarefa e data limite, receber pelo header o username.
---------------
### Requisitos
- [x] Deve ser possivel criar um usuario.
- [x] Deve ser possivel criar uma tarefa.
- [x] Deve ser possivel alterar uma tarefa.
- [x] Deve ser possivel alterar o concluido da tarefa.
- [x] Deve ser possivel deletar uma tarefa.
---------------
### Específicações dos testes.
## Testes de usuario
- [x] Should be able to create a new user - Para que esse teste passe, você deve permitir que um usuário seja criado e retorne um JSON com o usuário criado. Você pode ver o formato de um usuário.
Também é necessário que você retorne a resposta com o código `201`.
- [x] Should not be able to create a new user when username already exists - Para que esse teste passe, antes de criar um usuário você deve validar se outro usuário com o mesmo `username` já existe. Caso exista, retorne uma resposta com status `400` e um json no seguinte formato: A mensagem pode ser de sua escolha, desde que a propriedade seja `error`.

```jsx
{
	error: 'Mensagem do erro'
}
```
## Testes de tarefas.
- [x] Middleware - Para completar todos os testes referentes à todos é necessário antes ter completado o código que falta no middleware checkExistsUserAccount. Para isso, você deve pegar o username do usuário no header da requisição, verificar se esse usuário existe e então colocar esse usuário dentro da request antes de chamar a função next. Caso o usuário não seja encontrado, você deve retornar uma resposta contendo status 404 e um json no seguinte formato:
```jsx
{
	error: 'Mensagem do erro'
}
```
- [x] Should be able to list all user's todos

Para que esse teste passe, na rota GET `/todos` é necessário pegar o usuário que foi repassado para o `request` no middleware `checkExistsUserAccount` e então retornar a lista `todos` que está no objeto do usuário conforme foi criado.

- [x] Should be able to create a new todo

Para que esse teste passe, na rota POST `/todos` é necessário pegar o usuário que foi repassado para o `request` no middleware `checkExistsUserAccount`, pegar também o `title` e o `deadline` do corpo da requisição e adicionar um novo *todo* na lista `todos` que está no objeto do usuário.
Após adicionar o novo *todo* na lista, é necessário retornar um status `201` e o *todo* no corpo da resposta.

- [x] Should be able to update a todo

Para que esse teste passe, na rota PUT `/todos/:id` é necessário atualizar um *todo* existente, recebendo o `title` e o `deadline` pelo corpo da requisição e o `id` presente nos parâmetros da rota.

- [x] Should not be able to update a non existing todo

Para que esse teste passe, você não deve permitir a atualização de um *todo* que não existe e retornar uma resposta contendo um status `404` e um json no seguinte formato: 

```jsx
{
	error: 'Mensagem do erro'
}
```

- [x] Should be able to mark a todo as done

Para que esse teste passe, na rota PATCH `/todos/:id/done` você deve mudar a propriedade `done`de um *todo* de `false` para `true`, recebendo o `id` presente nos parâmetros da rota.

- [x] Should not be able to mark a non existing todo as done

Para que esse teste passe, você não deve permitir a mudança da propriedade `done` de um *todo* que não existe e retornar uma resposta contendo um status `404` e um json no seguinte formato: 

```jsx
{
	error: 'Mensagem do erro'
}
```

- [x] Should be able to delete a todo

Para que esse teste passe, DELETE `/todos/:id` você deve permitir que um *todo* seja excluído usando o `id` passado na rota. O retorno deve ser apenas um status `204` que representa uma resposta sem conteúdo.

- [x] Should not be able to delete a non existing todo

Para que esse teste passe, você não deve permitir excluir um *todo* que não exista e retornar uma resposta contendo um status `404` e um json no seguinte formato:

```jsx
{
	error: 'Mensagem do erro'
}
```