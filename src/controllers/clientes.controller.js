import { getConnection} from "../database/connection.js";

export const getCliente = async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    const {sCo_Cli} = req.query;
    const {empresa} = req.params;
    try{
        const pool = await getConnection(empresa);
        const result = await pool.request()
            .input("sCo_Cli", sCo_Cli)
            .execute('pSeleccionarCliente')
        pool.close();
    
        let cliente = [];
        let temp = result.recordset; 
        result.recordset.forEach((item, index) =>{
                cliente.push({
                    'cli_des' : item.cli_des.trim(),
                });
        }); 
        //res.json(temp);
        res.json(cliente);
    }catch(error){
        console.error(`El error consultando los clientes fue ${error}`);
    }    
};


export const getClientes = async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    const {empresa} = req.params;
    try{
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
    }catch(error){
        console.error(`El error consultando los clientes fue ${error}`);
    }    
};
