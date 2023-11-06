import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { validateTaskRequestBody, processValidationErrors } from "../helper.js";
import TaskDAO from "../DAO/TaskDAO.js";

const taskDao = new TaskDAO();

const TaskRoutes = express.Router();

TaskRoutes.use(express.json());

// const urlEncodedParser = bodyParser.urlencoded({extended: true});

TaskRoutes.get("/plan/:id", async (req: Request, res: Response) => {
    const planId = req.params.id;

    try {
        const tasks = await taskDao.getTasksByPlanId(planId);
        res.status(200).send(tasks);
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
        res.status(200).send(taskDetails.shift());
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