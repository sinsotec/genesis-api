import { getConnection} from "../database/connection.js";

export const getVentas = async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    const {empresa} = req.params;
    const pool = await getConnection(empresa);
    const result = await pool.request()
    .input("sCo_Moneda", "US$")
    //.execute('RepTotalVentaxArticulo');
    .execute('RepAnalisisVencimientoVenta')
    pool.close();
   
    let ventas = [];
    let art = result.recordset; 
    //result.recordset.forEach((venta, index) =>{
    //        ventas.push({
    //            'num_fact' : venta.doc_num.trim(),
    //            'art_des': venta.art_des.trim(),
    //            'total_art': venta.total_art,
    //            'monto_base': venta.monto_base + venta.iva
    //        });
    //}); 
    res.json(art);
    //res.json(ventas);
    
};
