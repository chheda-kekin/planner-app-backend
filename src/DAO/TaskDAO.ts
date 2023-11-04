import { MysqlError } from "mysql";
import { Request } from "express";
import connection, { executeQuery } from "../db.js";
import { CommentType, Label } from "../constants.js";
import { getCommentsString, getLabelsString } from "../helper.js";

class TaskDAO {

    public async updateTaskById(taskReq: Request): Promise<any> {
        const id = taskReq.body.id;        
        const name = taskReq.body.name;        
        const status = taskReq.body.status;        
        const priority = taskReq.body.priority;        
        const startDate = taskReq.body.startDate;        
        const dueDate = taskReq.body.dueDate;
        const updated = Date.now();        
        const notes = taskReq.body.notes;
        const members = taskReq.body.members;
        const labels: Label[] = taskReq.body.labels;
        const comments: CommentType[] = taskReq.body.comments;

        return new Promise((resolve, reject) => {
            // Validating start date & due date
            if(dueDate <= startDate) {
                reject(new Error(`Due date can not be smaller than start date.`));
            } else{

                const labelsVal = `[${getLabelsString(labels)}]`;
                const commentsVal = `[${getCommentsString(comments)}]`;

                const query = `UPDATE task SET name = '${name}', status = '${status}', priority = '${priority}', start = ${startDate}, due = ${dueDate}, updated = ${updated}, notes = '${notes}', members = '[${members}]', labels = '${labelsVal}', comments = '${commentsVal}' WHERE id = ${id}`;
                connection.query(query, (err: MysqlError, res: any) => {
                    if(err) {
                        reject(err);        
                    } else {
                        resolve(res);
                    }
                });
            }
        });
    }

    public async addTask(req: Request): Promise<any> {
        const planId = req.body.planId;
        const taskName = req.body.name;
        const status = req.body.status;
        const priority = req.body.priority;
        const startDate = req.body.startDate;
        const dueDate = req.body.dueDate;
        const members = req.body.members;
        const nowTime = Date.now();

        const query = `INSERT INTO task (plan_id, name, status, priority, start, due, created, updated, notes, members) VALUES (${planId}, '${taskName}', '${status}', '${priority}', ${startDate}, ${dueDate}, ${nowTime}, ${nowTime}, '', '[${members}]')`;

        try {
            return await executeQuery(query, connection);
        } catch (err) {
            throw err;
        }
    }

    public async getTasksByMemberId(memberId: string): Promise<any> {
        const query = `SELECT a.id AS task_id, a.plan_id AS plan_id, a.name AS name, 
                            a.status AS status, a.members AS members, 
                            a.due AS due, a.labels AS labels, 
                            b.name AS plan_name 
                            FROM task AS a INNER JOIN plan AS b on a.plan_id = b.id 
                            WHERE JSON_CONTAINS(a.members, '2')`;

        try {
            const res = await executeQuery(query, connection);
            return res;
        } catch(err) {
            throw err;
        }
    }

    public async getTasksByPlanId(planId: string): Promise<any> {
        const query = `SELECT a.id AS id, a.plan_id AS plan_id, 
                        a.name AS name, a.status AS status, a.due AS due, 
                            a.members as members, a.labels as labels, 
                            b.name AS plan_name 
                            FROM task AS a INNER JOIN plan AS b 
                            ON a.plan_id = b.id 
                            WHERE a.plan_id = ${planId}`;
                          
        try {
            const res = await executeQuery(query, connection);
            return res;
        } catch(err) {
            throw err;
        }                    
    }

    public async getTaskDetailsById(id: string): Promise<any> {
        const query = `SELECT a.*, b.name as plan_name 
                        FROM task AS a INNER JOIN plan AS b ON a.plan_id = b.id 
                        WHERE a.id = ${id}`;

        try {
            const res = await executeQuery(query, connection);
            return res;
        } catch(err) {
            throw err;
        }
    }

    public async deleteTaskById(id: string): Promise<any> {
        const query = `DELETE FROM task WHERE id = ${id}`;

        try {
            return await executeQuery(query, connection);
        } catch(err) {
            throw err;
        }
    }
}

export default TaskDAO;