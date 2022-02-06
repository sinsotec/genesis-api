import { config } from 'dotenv';
import sql from 'mssql';
import app from '../app.js';

//Pendiente probar pool de conexiones
//Probar con sequalize


const dbSettings = {
    server: process.env.SERVER,
    database: process.env.DB,
    user: process.env.USUARIO,
    password: process.env.PASS,
    options: {
        //encrypt: true,
        trustServerCertificate: true
    }
};

export async function getConnection(empresa) {
    try {
        dbSettings.database = empresa;
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
};


