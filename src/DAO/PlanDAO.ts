import Plan from "../model/Plan.js";
import connection from "../db.js";
import { MysqlError } from "mysql";

class PlanDAO {

    public getPlans(): any {
        let plans: Plan[] = [];

        connection.query('select *  from plan', (error: MysqlError, results: any, fields: any) => {
            if(error) {
                // console.error(error);
                throw error;
            } else if(results) {
                return results;
            }
        });
        
    }
}

export default PlanDAO;