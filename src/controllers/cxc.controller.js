import { getConnection} from "../database/connection.js";

export const getCxc = async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    const {empresa} = req.params;
    const pool = await getConnection(empresa);
    const result = await pool.request()
    //.input("sCo_Moneda", "US$")
    //.execute('RepTotalVentaxArticulo');
    .execute('RepAnalisisVencimientoVenta')
    pool.close();
   
    let cxc = [];
    //let temp = result.recordset; 
    result.recordset.forEach((item, index) =>{
            cxc.push({
                'num_fact' : item.nro_doc.trim(),
                'fecha_fact': item.fec_emis.toLocaleDateString(),
                'prov_des': item.prov_des.trim(),
                'total_neto': item.total_neto[0],
                'saldo': item.saldo_n_pago,
                'fec_venc': item.fec_venc.toLocaleDateString()
            });
    }); 
    //res.json(temp);
    res.json(cxc);
    
};
