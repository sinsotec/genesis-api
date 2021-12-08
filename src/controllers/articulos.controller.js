//import { json } from "express";
import { getConnection} from "../database/connection.js";
import sql from 'mssql';

export const getArticulos = async (req, res) => {
    const pool = await getConnection();
    
    
    const result = await pool.request()
    .input("sCo_NivelStock", "MAY")
    .execute('RepStockArticulos');
   
    let articulos = [];
    result.recordset.forEach((articulo, index) =>{
            articulos.push({
                'cod_art': articulo.co_art[0].trim(),
                'art_des': articulo.art_des[0].trim(),
                'StockActual': articulo.StockActual,
                'co_uni': articulo.co_uni.trim()
            });
    }); 

    res.json(articulos);
   // console.log(articulos.length);
    
};

