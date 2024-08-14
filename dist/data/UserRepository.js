"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor() {
        this.users = [];
    }
    getAllUsers() {
        return this.users;
    }
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
    addUser(user) {
        this.users.push(user);
    }
    updateUser(id, updatedUser) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = Object.assign(Object.assign({}, this.users[index]), updatedUser);
            return true;
        }
        return false;
    }
    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.UserRepository = UserRepository;
