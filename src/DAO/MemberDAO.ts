import { executeQuery } from "../db.js";
import connection from "../db.js";

class MemberDAO {

    public async getMembersById(members: number[]): Promise<any> {
        const query = `SELECT * FROM member WHERE id in (${members})`;

        try {
            const res = await executeQuery(query, connection);
            return res;
        } catch(err) {
            throw err;
        }
    }
}

export default MemberDAO;