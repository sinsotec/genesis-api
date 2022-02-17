import { getConnection} from "../database/connection.js";

export const getClientes = async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    const {empresa} = req.params;
    const pool = await getConnection(empresa);
    const result = await pool.request()
    //.input("sCo_Moneda", "US$")
    //.execute('RepTotalVentaxArticulo');
    .execute('RepClienteDatosBasicos')
    pool.close();
   
    let clientes = [];
    let temp = result.recordset; 
    result.recordset.forEach((cliente, index) =>{
            clientes.push({
                'cli_des' : cliente.cli_des.trim(),
                'rif': cliente.rif,
                'direccion': cliente.direc1 == null ? 'No posee' : cliente.direc1.trim(),
                'telefonos': cliente.telefono
            });
    }); 
    //res.json(temp);
    res.json(clientes);
    
};
