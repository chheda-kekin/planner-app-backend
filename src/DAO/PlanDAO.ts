// import Plan from "../model/Plan.js";
import connection, { executeQuery } from "../db.js";
import { Request } from "express";
// import { MysqlError } from "mysql";

class PlanDAO {

    public async getPlans(): Promise<any> {
        const query = 'select *  from plan';

        try {
            const res = executeQuery(query, connection);
            return res;
        } catch(err) {
            throw err;
        }
    }

    public async addPlan(req: Request): Promise<any> {
        const nowTime = Date.now();
        const planName = req.body.name;

        const query = `INSERT INTO plan (name, created, updated) VALUES ('${planName}', ${nowTime}, ${nowTime})`;

        try {
            const res = await executeQuery(query, connection);
            return res;
        } catch(err) {
            throw err;
        }
    }

    public insertPlan(req: Request): any {
        const nowTime = Date.now();
        const planName = req.body.name;

        return `${planName} ${nowTime}`;
    }
}

export default PlanDAO;