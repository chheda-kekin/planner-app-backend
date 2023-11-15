// import Plan from "../model/Plan.js";
import connection, { executeQuery } from "../db.js";
import { Status } from "../constants.js";
import { Request } from "express";
// import { MysqlError } from "mysql";

class PlanDAO {

    public async getPlans(): Promise<any> {
        const query = 'SELECT count(b.id) AS task_count, b.status, b.id AS task_id, a.id AS plan_id, b.due AS due, a.name AS plan_name FROM plan AS a LEFT JOIN task AS b ON a.id = b.plan_id GROUP BY a.id, b.status, b.id';

        try {
            const res = await executeQuery(query, connection);
            const temp: any = res.map((ele: any) => {
                return {
                    id: ele.plan_id,
                    planName: ele.plan_name,
                    notStarted: 0,
                    inProgress: 0,
                    completed: 0,
                    due: 0
                };
            }).reduce((acc: any, current: any) => {
                const keysArr = Object.keys(acc);
                if(! keysArr.includes(current.id)) {
                    acc[current.id] = current;
                }

                return acc;
            }, {});

            res.forEach((e: any) => {
                if(e.status === Status.NotStarted) {
                    temp[`${e.plan_id}`].notStarted++;
                } else if(e.status === Status.InProgress) {
                    temp[`${e.plan_id}`].inProgress++;
                } else if(e.status === Status.Completed) {
                    temp[`${e.plan_id}`].completed++;
                }

                if(e.due && Date.now() > e.due) {
                    temp[`${e.plan_id}`].due++;
                }
            });
            return Object.values(temp);
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