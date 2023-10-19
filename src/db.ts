import  mysql  from 'mysql';
import dotenv from "dotenv";

dotenv.config();

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
const database = process.env.DB_NAME || 'planner';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';


// password: K#kinjcchh#DA1990
const connection = mysql.createConnection({
    host,
    port,
    database,
    user,
    password
});

connection.connect((err) => {
    if(err) {
        console.log('Error occured while connecting!', err);
    } else {
        console.log('Connection created successfully!');
     }
});

export default connection;