import { getConnection} from "../database/connection.js";

export const getCajas = async (req, res) => {
    console.log("Params")
    console.log(req.params);
    console.log("Query")
    const data = req.query;
    console.log(data.sFecha_d);
    const {empresa} = req.params;
    const pool = await getConnection(empresa);
    try{  
        const result = await pool.request()
        .input("sFecha_d", data.sFecha_d)
        .execute('RepMoviCajaXFecha');
        pool.close();
    
        let cajas = [];
        let caj = result.recordset; 
        /* result.recordset.forEach((caja, index) =>{
            cajas.push({
                    'mov_num' : caja.mov_num.trim(),
                    'art_des': venta.art_des.trim(),
                    'total_art': venta.total_art,
                    'monto_base': venta.monto_base + venta.iva
            });
        });  */
        res.json(caj);
    }catch(error){
        console.error(`El error consultando cajas fue ${error}`);
    }        
};
