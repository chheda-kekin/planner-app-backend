import { Member } from "../constants.js";
import connection, { executeQuery } from "../db.js";

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

    public async getMembers(searchKeyword: string): Promise<any> {

        let query = `SELECT id, fname AS firstName, lname AS lastName FROM member WHERE is_removed = "no"`;

        const searchKey = searchKeyword.trim();

        if(searchKey !== '') {
            query = query + ` AND fname LIKE "%${searchKey.toLowerCase()}%" OR lname LIKE "%${searchKey.toLowerCase()}%"`;
        }

        try {
            const res = await executeQuery(query, connection);
            return res;
        } catch(err) {
            throw err;
        }
    }

    public async addMember(member: Member): Promise<any> {
        let query = `INSERT INTO member (fname, lname, email, gender, phone, dob,  password, created, updated) 
                        VALUES ('${member.firstName}', '${member.lastName}', '${member.email}', 
                            '${member.gender}', '${member.phone}', '${member.dob}', '${member.password}', ${Date.now()}, ${Date.now()})`;

        try {
            const res = await executeQuery(query, connection);
            return res;
        } catch(err) {
            throw err;
        }
    }
}

export default MemberDAO;