import { ServerResponse } from 'http';

export class UserView {
  sendResponse(res: ServerResponse, statusCode: number, data: object): void {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }
}