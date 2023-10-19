import express, { Request, Response } from "express";
import { MysqlError } from "mysql";
import bodyParser from "body-parser";
import { Validator } from "jsonschema";
import connection from "./db.js";

const PlanRoutes = express.Router();

const urlEncodedParser = bodyParser.urlencoded({extended: false});

const v = new Validator();
const planSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 3,
            "maxLength": 50
        }
    },
    "required": ["name"]
};

PlanRoutes.use(express.json());

PlanRoutes.post('/add', urlEncodedParser, (req: Request, res: Response) => {

    // Validating request body for required params
    if(v.validate(req.body, planSchema).valid) {
        const planName = req.body.name;
        // Validating planName for special characters
        // Sending proper error message

        const nowTime = Date.now();
        
        connection.query(`insert into plan (name, created, updated) values ("${planName}", ${nowTime}, ${nowTime})`, (err: MysqlError, result: any) => {
            if(err) {
                res.sendStatus(500).send(new Error('Internal server error!'));
            } else {
                res.sendStatus(200).send(result);
            }
        });
    }
});

PlanRoutes.get('/', (req: Request, res: Response) => {
    
    connection.query('select *  from plan limit 0, 100', (err: MysqlError, results: any) => {
        if(err) {
            console.error(err);
        } else if(results) {
            res.send(results);
        }
    });
});

export default PlanRoutes;