import { getConnection} from "../database/connection.js";

export const getInventario = async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    const {empresa} = req.params;
    const pool = await getConnection(empresa);
    const result = await pool.request()
    .input("sCo_NivelStock", "MAY")
    .execute('RepStockArticulos');
    pool.close();
   
    let articulos = [];
    //let art = result.recordset; 
    result.recordset.forEach((articulo, index) =>{
            articulos.push({
                'cod_art': articulo.co_art[0].trim(),
                'art_des': articulo.art_des[0].trim(),
                'StockActual': articulo.StockActual,
                'co_uni': articulo.co_uni.trim()
            });
    }); 

    res.json(articulos);
    //res.json(art)
   // console.log(articulos.length);
    
};

