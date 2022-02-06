import { getConnection} from "../database/connection.js";

export const getCajas = async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    let empresa = req.query.empresa;
    const pool = await getConnection(empresa);
    const result = await pool.request()
    //.input("cTipoMovi", "E")
    .execute('RepMoviCajaXNum');
    pool.close();
   
    let cajas = [];
    let caj = result.recordset; 
    /* result.recordset.forEach((caja, index) =>{
            cajas.push({
                'num_fact' : caja.doc_num.trim(),
                'art_des': venta.art_des.trim(),
                'total_art': venta.total_art,
                'monto_base': venta.monto_base + venta.iva
            });
    });  */

    res.json(caj);
    
};
