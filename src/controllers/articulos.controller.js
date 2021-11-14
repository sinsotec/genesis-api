//import { json } from "express";
import { getConnection } from "../database/connection";

export const getArticulos = async (req, res) => {
    const pool = await getConnection();
    pool.request().input('sCo_NivelStock', 'IA0');
    const result = await pool.request().execute('RepStockArticulos');
    //const result = await pool.request().execute('RepSucursal');
    let articulos = [];
    result.recordset.forEach((articulo, index) =>{
        if (articulo.StockActual > 0){
            articulos.push({
                'cod_art': articulo.co_art[0].trim(),
                'art_des': articulo.art_des[0],
                'StockActual': articulo.StockActual
            });       
        };   
    }); 

    res.json(articulos);
    console.log(articulos.length);
    
};

