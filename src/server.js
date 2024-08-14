"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const UserController_1 = require("./controllers/UserController");
const port = 3000;
const userController = new UserController_1.UserController();
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/users' && method === 'GET') {
        userController.handleGetAllUsers(req, res);
    }
    else if ((url === null || url === void 0 ? void 0 : url.startsWith('/users/')) && method === 'GET') {
        const id = url.split('/')[2];
        userController.handleGetUserById(req, res, id);
    }
    else if (url === '/users' && method === 'POST') {
        userController.handleCreateUser(req, res);
    }
    else if ((url === null || url === void 0 ? void 0 : url.startsWith('/users/')) && method === 'PUT') {
        const id = url.split('/')[2];
        userController.handleUpdateUser(req, res, id);
    }
    else if ((url === null || url === void 0 ? void 0 : url.startsWith('/users/')) && method === 'DELETE') {
        const id = url.split('/')[2];
        userController.handleDeleteUser(req, res, id);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}!`);
});
