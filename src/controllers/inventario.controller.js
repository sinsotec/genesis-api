import { getConnection} from "../database/connection.js";
import { getImpuestos, getTasa} from "../controllers/parametros.controller"
import { getFechaAhora} from "../controllers/fecha.controller";

const getStockArticulos = async (empresa) => {
    try{
        console.log("consultando Stock");
        const pool = await getConnection(empresa);
        const result = await pool.request()
                            //.input("sCo_NivelStock", "MAY")
                            .execute('RepStockArticulos');
        pool.close();
    
        let articulos = [];
        result.recordset.forEach((articulo, index) =>{
                articulos.push({
                    'cod_art': articulo.co_art[0].trim(),
                    'stockActual': articulo.StockActual,
                    'des_uni': articulo.des_uni,
                    'tipo_imp': articulo.tipo_imp.trim()
                });
        }); 
        //console.log(articulos);
        return articulos;
    }catch(error){
        console.error(`El error consultando el inventario fue ${error}`);
    }        
}




export const getInventario = async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    const {empresa} = req.params;
    try{
        const pool = await getConnection(empresa);
        const result = await pool.request()
        .input("sCo_NivelStock", "MAY")
        .execute('RepStockArticulos');
        pool.close();
    
        let articulos = [];
        let art = result.recordset; 
        result.recordset.forEach((articulo, index) =>{
                articulos.push({
                    'cod_art': articulo.co_art[0].trim(),
                    'art_des': articulo.art_des[0].trim(),
                    'StockActual': articulo.StockActual,
                    'co_uni': articulo.co_uni.trim()
                });
        }); 
        console.log(art);

        //res.json(articulos);
        res.json(art)
    }catch(error){
    
        console.error(`El error consultando el inventario fue ${error}`);
        return error;

    }        
}

export const getPrecioArticuloOM = async (req, res) => {
    /* console.log(req.params);
    console.log(req.query); */
    const {empresa} = req.params;
    try{
        const dtFecha = await getFechaAhora();
        const impuestos = await getImpuestos({dtFecha, empresa});
        const tasa = await getTasa({dtFecha, empresa});
        const pool = await getConnection(empresa);
        console.log("Inicia consulta de preciosOM");
        const result = await pool.request()
                            .input("sCo_Almacen", "01")
                            .input("sCo_Precio01", "01")
                            //.input("sCo_NivelStock", "MAY")
                            //.input("sCo_Tasa", tasa)
                            .input("sCo_FechaHasta", dtFecha)
                            //.input("sCo_MonedaFiltro", "US$")
                            .execute('RepArticuloConPrecioOM');
        pool.close();
        console.log("Termina consulta de preciosOM");
        const stockArticulos = await getStockArticulos(empresa); //consulta stock y tipo de impuesto
        let articulos = [];
        let parametros = [];
        parametros.push({
            'tasa': tasa,
            'impuestos': impuestos
        });
        let art = result.recordset; 
        result.recordset.forEach((articulo, index) =>{
                //stockArticulos.map(item => console.log(item.stockActual));
                let busquedaArticulo = stockArticulos.find(item => item.cod_art == articulo.co_art.trim());
                const por_tasa = impuestos.find(imp => imp.tipo_imp == busquedaArticulo.tipo_imp).por_tasa;
                const priceOM = articulo.PrecioOM;
                const ivaOM = parseFloat((priceOM * por_tasa / 100).toFixed(2));              
                const totalPriceOM = parseFloat((priceOM + ivaOM).toFixed(2));
                const price = parseFloat((priceOM * tasa).toFixed(2));
                const iva = parseFloat((ivaOM * tasa).toFixed(2));
                const totalPrice = parseFloat((totalPriceOM * tasa).toFixed(2));
                //console.log(busquedaArticulo);
                articulos.push({
                    'cod_art': articulo.co_art.trim(),
                    'art_des': articulo.art_des.trim(),
                    'tipo_impuesto': busquedaArticulo.tipo_imp,
                    'por_imp': por_tasa,
                    'stock_actual': busquedaArticulo.stockActual,
                    'co_uni': articulo.co_uni.trim(),
                    'des_uni': busquedaArticulo.des_uni,
                    'priceOM': priceOM,
                    'ivaOM': ivaOM,
                    'total_priceOM': totalPriceOM,
                    'price': price,
                    'iva': iva,
                    'total_price': totalPrice
                });
                //console.log(stockArticulos.find(item => item.cod_art = articulo.co_art ).tipo_imp);
        }); 
        //console.log(art);
        let resultado = [];
        resultado.push(parametros, articulos);
        //console.log(resultado[0]);
        console.log(articulos[0]);
        res.json(resultado);
        //res.json(art)
    }catch(error){
        console.error(`El error consultando el inventario fue ${error}`);
    }        
}







export const getListadoDatosArticulos = async (req, res) => {
    /*  Consulta Ejecutada por Sistema:
        exec pObtenerListadoDatosArticulo 
            @sDatabase_Name=N'DEMOA',
            @sField_Name=N'Art_Des',
            @sValor=N'',
            @bAvanzada=0,
            @bUsaOperadorLogicoAND=1,
            @bAplica_Manejo_Lote=0,
            @sManeja_Lote=0,
            @bAplica_Manejo_Serial=0,
            @sManeja_Serial=0,
            @bAplica_EsInactivo=0,
            @sEsInactivo=0,
            @bAplica_Tipo=0,
            @sTipo=N'V',
            @bAplica_C
    */ 
    
    console.log(req.params);
    console.log(req.query);
    const {empresa} = req.params;
    try{
        const pool = await getConnection(empresa);
        const result = await pool.request()
        .input("sDatabase_Name", empresa)
        .input("sField_Name","Art_Des")
        .input('bAvanzada', 0)
        .input('bUsaOperadorLogicoAND', 1)
        .input('bAplica_EsInactivo', 1)
        .input('sEsInactivo', 1)
        .input("iOpcion", 0)
        .execute('pObtenerListadoDatosArticulo');
        pool.close();
    
        let articulos = [];
        let art = result.recordset; 
        result.recordset.forEach((articulo, index) =>{
                articulos.push({
                    'cod_art': articulo.co_art.trim(),
                    'art_des': articulo.art_des.trim()
                });
        }); 

        //res.json(articulos);
        res.json(art)
        // console.log(articulos.length);
    }catch(error){
        //console.error(`El error consultando el inventario fue ${error}`);
    }        
};

