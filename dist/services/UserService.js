"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
const UserRepository_1 = require("../data/UserRepository");
const uuid_1 = require("uuid");
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    getAllUsers() {
        return this.userRepository.getAllUsers();
    }
    getUserById(id) {
        return this.userRepository.getUserById(id);
    }
    createUser(name, email, dateOfBirth) {
        const newUser = new User_1.User((0, uuid_1.v4)(), name, email, dateOfBirth);
        this.userRepository.addUser(newUser);
        return newUser;
    }
    updateUser(id, updatedUser) {
        return this.userRepository.updateUser(id, updatedUser);
    }
    deleteUser(id) {
        return this.userRepository.deleteUser(id);
    }
}
exports.UserService = UserService;
