import { getConnection} from "../database/connection.js";


export const getImpuestos = async (req) => {
    console.log("Consultando impuestos");
    const {dtFecha, empresa} = req;
    const pool = await getConnection(empresa);
    const result = await pool.request()
                            .input("dtFecha", dtFecha)
                            .input("bVentas", 0)
                            .execute('pObtenerFechaImpuestoSobreVenta');
    pool.close();

    let impuestos = [];
    result.recordset.forEach((impuesto, index) =>{
            impuestos.push({
                'tipo_imp': impuesto.tipo_imp,
                'por_tasa': impuesto.porc_tasa
            });
    }); 
    console.log(impuestos);
    return impuestos;
}


export const getTasa = async (req) => {
    console.log("Consultando Tasa");
    const {dtFecha, empresa} = req;
    const pool = await getConnection(empresa);
    const result = await pool.request()
                            .input("dtFecha", dtFecha)
                            .input("sCo_Mone", "USD")
                            .execute('pObtenerFechaTasa');
    pool.close();
    
    const tasa = result.recordset[0]["TASA_C"]; 
    console.log(tasa);
    return tasa;
}

