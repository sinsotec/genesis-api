import { getConnection } from "../database/connection";
import sql from 'mssql';


export const getArticulos = async (req, res) => {
    const pool = await getConnection();
    pool.request().input('sCo_NivelStock', 'IA0');
    const result = await pool.request().execute('RepStockArticulos');
    //const result = await pool.request().execute('RepSucursal');
    res.json(result.recordsets);
   // res.json(result.recordset[0].co_art[0]);
    //console.log(result.recordset[0]);

};

