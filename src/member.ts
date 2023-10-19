import express, { Request, Response } from "express";
import { MysqlError } from "mysql";
import connection from "./db.js";

const MemberRoutes = express.Router();

MemberRoutes.get("/", (req: Request, res: Response) => {
        
});

export default MemberRoutes;