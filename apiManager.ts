const express = require('express');
// @ts-ignore
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';

class ApiManager {

    private readonly _app: any
    constructor() {
        this._app = express();
        this._app.use(bodyParser.json()); // to support JSON-encoded bodies
    }

    init() {
        this._app.get('/healthcheck', (_: Request , res: Response) => {
            res.sendStatus(200);
        });

    }

    get app() {
        return this._app;
    }
}

export default new ApiManager();
