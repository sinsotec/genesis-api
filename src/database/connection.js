import { config } from 'dotenv';
import sql from 'mssql';
import app from '../app.js';

const dbSettings = {
    server: process.env.SERVER,
    database:"DEMOA",
    user: process.env.USER,
    password: process.env.PASS,
    options: {
        //encrypt: true,
        trustServerCertificate: true
    }
};

export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
};


