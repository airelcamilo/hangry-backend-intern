"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const UserView_1 = require("../views/UserView");
class UserController {
    constructor() {
        this.userService = new UserService_1.UserService();
        this.userView = new UserView_1.UserView();
    }
    handleGetAllUsers(_, res) {
        const users = this.userService.getAllUsers();
        this.userView.sendResponse(res, 200, users);
    }
    handleGetUserById(_, res, id) {
        const user = this.userService.getUserById(id);
        if (user) {
            this.userView.sendResponse(res, 200, user);
        }
        else {
            this.userView.sendResponse(res, 404, { message: `User ${id} not found!` });
        }
    }
    handleCreateUser(req, res) {
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
    handleUpdateUser(req, res, id) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedUser = JSON.parse(body);
            const success = this.userService.updateUser(id, updatedUser);
            if (success) {
                this.userView.sendResponse(res, 200, { message: `User ${id} updated!` });
            }
            else {
                this.userView.sendResponse(res, 404, { message: `User ${id} not found!` });
            }
        });
    }
    handleDeleteUser(_, res, id) {
        const success = this.userService.deleteUser(id);
        if (success) {
            this.userView.sendResponse(res, 200, { message: `User ${id} deleted` });
        }
        else {
            this.userView.sendResponse(res, 404, { message: `User ${id} not found!` });
        }
    }
}
exports.UserController = UserController;
