import sql from 'mssql';
import config from '../config.js';

//Pendiente probar pool de conexiones
//Probar con sequalize


const dbSettings = {
    server: config.server,
    database: config.database,
    user: config.user,
    password: config.password,
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


