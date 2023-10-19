import { Gender } from "../constants.js";

class Member {
    fname: string;
    lname: string;
    email: string;
    gender: Gender;
    phone: string;
    dob: Date;
    password: string;
    created: number;
    updated: number;

    constructor(fname: string, lname: string, email: string, gender: Gender, phone: string, dob: Date, password: string, created: number, updated: number) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.gender = gender;
        this.phone = phone;
        this.dob = dob;
        this.password = password;
        this.created = created;
        this.updated = updated;
    }
}

export default Member;