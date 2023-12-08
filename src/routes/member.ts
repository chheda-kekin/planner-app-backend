import express, { Request, Response } from "express";
import MemberDAO from "../DAO/MemberDAO.js";

const MemberRoutes = express.Router();

const memberDao = new MemberDAO();

MemberRoutes.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Headers', 'content-type');
    next();
});

MemberRoutes.use(express.json());

MemberRoutes.get("/", async (req: Request, res: Response) => {
    const key = req.query.key ? (req.query.key as string) : '';

    try {
        const allMembers = await memberDao.getMembers(key);
        res.status(200).send(allMembers);
    } catch(err) {
        res.status(500).send(err);
    }
});

export default MemberRoutes;