import * as http from 'http';
import { UserController } from './controllers/UserController';

const port = 3001;
const userController = new UserController();

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/users' && method === 'GET') {
    userController.handleGetAllUsers(req, res);

  } else if (url?.startsWith('/users/') && method === 'GET') {
    const id = url.split('/')[2];
    userController.handleGetUserById(req, res, id);

  } else if (url === '/users' && method === 'POST') {
    userController.handleCreateUser(req, res);

  } else if (url?.startsWith('/users/') && method === 'PUT') {
    const id = url.split('/')[2];
    userController.handleUpdateUser(req, res, id);

  } else if (url?.startsWith('/users/') && method === 'DELETE') {
    const id = url.split('/')[2];
    userController.handleDeleteUser(req, res, id);

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}!`);
});