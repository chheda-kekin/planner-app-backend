import connection from "./db.js";
import express, { Express, Request, Response } from "express";

import PlanRoutes from "./routes/plan.js";
import TaskRoutes from "./routes/task.js";
import MemberRoutes from "./routes/member.js";

import dotenv from "dotenv";
// import { MysqlError } from "mysql";

dotenv.config();

const app: Express = express();

const port = process.env.PORT;

app.use(express.json());
app.use('/plans', PlanRoutes);
app.use('/tasks', TaskRoutes);
app.use('/member', MemberRoutes);


app.listen(port, () => {
    console.log(`App running on ${port}!!!`);
});