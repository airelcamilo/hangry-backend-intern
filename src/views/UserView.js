"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserView = void 0;
class UserView {
    sendResponse(res, statusCode, data) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }
}
exports.UserView = UserView;
