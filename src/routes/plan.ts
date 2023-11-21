import { processValidationErrors, validatePlanRequestBody } from "../helper.js";
import PlanDAO from "../DAO/PlanDAO.js";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const PlanRoutes = express.Router();

const planDao = new PlanDAO();

PlanRoutes.use(express.json());

PlanRoutes.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Headers', 'content-type');
    next();
});

PlanRoutes.post('/add', bodyParser.json({}), async (req: Request, res: Response) => {
    
    // Validating request body for required params
    const validationRes = validatePlanRequestBody(req.body);
    if(validationRes.valid) {
        try {
            const planRes = await planDao.addPlan(req)
            res.status(200).send(planRes);
        } catch(err) {
            res.status(500).send(err);
        }
    } else {
        res.status(400).send(processValidationErrors(validationRes.errors));
    }
});

PlanRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const planRes = await planDao.getPlans();
        res.status(200).send(planRes);
    } catch(err) {
        res.status(500).send(err);
    }
});

export default PlanRoutes;