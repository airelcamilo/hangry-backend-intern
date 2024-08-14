import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from '../services/UserService';
import { UserView } from '../views/UserView';

export class UserController {
  private userService: UserService;
  private userView: UserView;

  constructor() {
    this.userService = new UserService();
    this.userView = new UserView();
  }

  handleGetAllUsers(_: IncomingMessage, res: ServerResponse): void {
    const users = this.userService.getAllUsers();
    this.userView.sendResponse(res, 200, users);
  }

  handleGetUserById(_: IncomingMessage, res: ServerResponse, id: string): void {
    const user = this.userService.getUserById(id);
    if (user) {
      this.userView.sendResponse(res, 200, user);
    } else {
      this.userView.sendResponse(res, 404, { message: `User ${id} not found!` });
    }
  }

  handleCreateUser(req: IncomingMessage, res: ServerResponse): void {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { name, email, dateOfBirth } = JSON.parse(body);
      const newUser = this.userService.createUser(name, email, dateOfBirth);
      this.userView.sendResponse(res, 201, newUser);
    });
  }

  handleUpdateUser(req: IncomingMessage, res: ServerResponse, id: string): void {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedUser = JSON.parse(body);
      const success = this.userService.updateUser(id, updatedUser);
      if (success) {
        this.userView.sendResponse(res, 200, { message: `User ${id} updated!` });
      } else {
        this.userView.sendResponse(res, 404, { message: `User ${id} not found!` });
      }
    });
  }

  handleDeleteUser(_: IncomingMessage, res: ServerResponse, id: string): void {
    const success = this.userService.deleteUser(id);
    if (success) {
      this.userView.sendResponse(res, 200, { message: `User ${id} deleted` });
    } else {
      this.userView.sendResponse(res, 404, { message: `User ${id} not found!` });
    }
  }
}