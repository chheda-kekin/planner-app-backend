import express, { Request, Response } from "express";
import { MysqlError } from "mysql";
import connection from "./db.js";

const TaskRoutes = express.Router();

TaskRoutes.use(express.json());

function isMemberExists(task: any, memberId: number): boolean {
    return task.members.findIndex((member: any) => member.memberId === memberId) !== -1;
}

function isLabelExists(task: any, labelId: number): boolean {
    return task.labels.findIndex((label: any) => label.labelId === labelId) !== -1;
}

TaskRoutes.get("/plan/:id", (req: Request, res: Response) => {
    const planId = req.params.id;
    const query = `select a.id as task_id, a.plan_id as plan_id, a.name as name, a.status as status, a.due as due, b.name as plan_name, c.color as label_color, c.value as label_value, c.id as label_id, d.member_id as member_id, e.fname as member_fname, e.lname as member_lname from task as a inner join plan as b on a.plan_id = b.id inner join labels as c on a.id = c.task_id inner join taskmembers as d  on a.id = d.task_id inner join member as e on member_id = e.id where a.plan_id = ${planId}`;
    
    connection.query(query, 
        (err: MysqlError, results: Array<any>) => {
            if(err) {
                res.send(err);
            } else if(results) {
                const result: Array<any> = [];

                results.forEach((task) => {
                    
                    const taskIndex = result.findIndex(t => t.id === task.task_id);

                    const memberObj = {
                        memberId: task.member_id,
                        memberFirstName: task.member_fname,
                        memberLastName: task.member_lname
                    };

                    const labelObj = {
                        labelId: task.label_id,
                        labelColor: task.label_color,
                        labelValue: task.label_value
                    };

                    if(taskIndex === -1) {
                        const taskObj = {
                            id: task.task_id,
                            name: task.name,
                            planId: task.plan_id,
                            planName: task.plan_name,
                            status: task.status,
                            due: task.due,
                            labels: [labelObj],
                            members: [memberObj]
                        };

                        result.push(taskObj);
                    } else {
                        // Check whether member exists
                        if(! isMemberExists(result[taskIndex], task.member_id)) {
                            result[taskIndex].members.push(memberObj);                                    
                        }

                        // Check whether labels exists
                        if(! isLabelExists(result[taskIndex], task.label_id)) {
                            result[taskIndex].labels.push(labelObj);
                        }
                        
                    }
                });
                
                res.send(result);
            }
    });
});

TaskRoutes.get("/member/:id", (req: Request, res: Response) => {
    const memberId = req.params.id;
    
    const query = `select a.id as task_id, a.plan_id as plan_id, a.name as name, a.status as status, a.due as due, b.name as plan_name, c.color as label_color, c.value as label_value, c.id as label_id, d.member_id as member_id from task as a inner join plan as b on a.plan_id = b.id inner join labels as c on a.id = c.task_id inner join taskmembers as d  on a.id = d.task_id where member_id = ${memberId}`;
    connection.query(query, (err: MysqlError, results: Array<any>) => {
        if(err) {
            res.send(err);
        } else if(results) {
            const result: Array<any> = [];

            results.forEach((task) => {
                const taskIndex = result.findIndex(t => t.id === task.task_id);

                    const labelObj = {
                        labelId: task.label_id,
                        labelColor: task.label_color,
                        labelValue: task.label_value
                    };

                    if(taskIndex === -1) {
                        const taskObj = {
                            id: task.task_id,
                            name: task.name,
                            planId: task.plan_id,
                            planName: task.plan_name,
                            status: task.status,
                            due: task.due,
                            labels: [labelObj]
                        };

                        result.push(taskObj);
                    } else {
                        // Check whether labels exists
                        if(! isLabelExists(result[taskIndex], task.label_id)) {
                            result[taskIndex].labels.push(labelObj);
                        }
                    }
            });

            res.send(result);
        }
    });
});

export default TaskRoutes;