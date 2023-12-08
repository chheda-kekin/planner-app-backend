import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { validateTaskRequestBody, processValidationErrors } from "../helper.js";
import TaskDAO from "../DAO/TaskDAO.js";
import MemberDAO from "../DAO/MemberDAO.js";

const taskDao = new TaskDAO();
const memberDao = new MemberDAO();

const TaskRoutes = express.Router();

TaskRoutes.use(express.json());

TaskRoutes.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Headers', 'content-type');
    res.append('Access-Control-Allow-Methods', ['*']);
    next();
});

// const urlEncodedParser = bodyParser.urlencoded({extended: true});

TaskRoutes.get("/plan/:id", async (req: Request, res: Response) => {
    const planId = req.params.id;

    try {
        const tasks = await taskDao.getTasksByPlanId(planId);
        const tasksArr = tasks.reduce((acc: Array<any>, current: any) => {
            const taskIndex = acc.findIndex((task: any) => current.id === task.id);

            const currentMember = {
                id: current.memberId,
                firstName: current.firstName,
                lastName: current.lastName
            };

            if(taskIndex === -1) {
                const taskObj = {
                    id: current.id,
                    name: current.name,
                    planId: current.planId,
                    planName: current.planName,
                    status: current.status,
                    due: current.due,
                    labels: current.labels,
                    members: [currentMember]
                };

                acc.push(taskObj);
            } else {
                acc[taskIndex].members.push(currentMember);
            }

            return acc;
        }, []);
        res.status(200).send(tasksArr);
    } catch(err) {
        res.status(500).send(err);
    }
});

TaskRoutes.get("/member/:id", async (req: Request, res: Response) => {
    const memberId = req.params.id;

    try {
        const tasks = await taskDao.getTasksByMemberId(memberId);
        res.status(200).send(tasks);
    } catch(err) {
        res.status(500).send(err);
    }
});

TaskRoutes.get("/details/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const taskDetails = await taskDao.getTaskDetailsById(id);

        let taskDataObj: any = {
            id: taskDetails[0].id,
            name: taskDetails[0].name,
            planId: taskDetails[0].planId,
            planName: taskDetails[0].planName,
            status: taskDetails[0].status,
            priority: taskDetails[0].priority,
            start: taskDetails[0].start,
            due: taskDetails[0].due,
            created: taskDetails[0].created,
            updated: taskDetails[0].updated,
            notes: taskDetails[0].notes,
            labels: taskDetails[0].labels ? JSON.parse(taskDetails[0].labels) : [],
            comments: taskDetails[0].comments ? JSON.parse(taskDetails[0].comments): [],
            members: []
        };

        taskDetails.forEach((current: any) => {
            const member = {
                id: current.memberId,
                firstName: current.firstName,
                lastName: current.lastName
            };
            taskDataObj.members.push(member);
        });
        
        res.status(200).send(taskDataObj);
    } catch(err) {
        res.status(500).send(err);
    }
});

TaskRoutes.put("/update", bodyParser.json({}), async (req: Request, res: Response) => {
    // Validate task request body
    const validationRes = validateTaskRequestBody(req.body);

    if(validationRes.valid) {
        // Check the task id in request body
        if(req.body?.id) {
            // Perform update operation based on id
            try {
                const updateRes = await taskDao.updateTaskById(req);
                res.status(200).send(updateRes);
            } catch(err) {
                res.status(500).send(err);
            }
        } else {
            // Perform insert operation
            try {
                const insertRes = await taskDao.addTask(req);
                res.status(200).send(insertRes);
            } catch(err) {
                res.status(500).send(err);
            }
        }
    } else {
        res.status(400).send(processValidationErrors(validationRes.errors));
    }
});

TaskRoutes.delete("/delete/:id", async (req: Request, res: Response) => {
    const taskId = req.params.id;
    
    try {
        const deleteRes = await taskDao.deleteTaskById(taskId);
        res.status(200).send(deleteRes);
    } catch(err) {
        res.status(500).send(err);
    }
});

export default TaskRoutes;