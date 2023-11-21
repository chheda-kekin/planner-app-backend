import express, { Request, Response } from "express";
import { MysqlError } from "mysql";
import connection from "../db.js";

const MemberRoutes = express.Router();

MemberRoutes.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Headers', 'content-type');
    next();
});

MemberRoutes.get("/", (req: Request, res: Response) => {
        
});

export default MemberRoutes;