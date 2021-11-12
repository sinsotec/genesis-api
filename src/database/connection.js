import sql from 'mssql';

const dbSettings = {
    server:"caracas1.pidigitalgroup.net", // "149.56.238.94",
    database:"DEMOA",
    user:"profitdigital",
    password:"634949Tsc..!",
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

