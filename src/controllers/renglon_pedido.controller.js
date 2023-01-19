import { getConnection} from "../database/connection.js";


export const insertRenglonPedido = async (req, res) => {
    console.log(`Insertando renglones a pedidos`);
    console.log(req)
    const {empresa} = req.params;
    const {sDoc_Num, coSucur, articulos} = req.body;
    console.log(empresa);
    //console.log(articulos);

    try {

        articulos.forEach( async (articulo, index) => {
            console.log(articulo);
            const pool = await getConnection(empresa);
            
            const result = await pool.request()
                                    .input("sDoc_Num", sDoc_Num)
                                    .input("sCo_Art", articulo.sCo_Art)
                                    .input("sDes_Art", null)
                                    .input("sCo_Uni", articulo.sCo_Uni)
                                    .input("sSco_Uni", null)
                                    .input("sCo_Alma", articulo.sCo_Alma)
                                    .input("sCo_Precio", articulo.sCo_Precio)
                                    .input("sTipo_Imp", articulo.sTipo_Imp)
                                    .input("sTipo_Imp2", null)
                                    .input("sTipo_Imp3", null)
                                    .input("deTotal_Art", articulo.deTotal_Art)
                                    .input("deStotal_Art", 0)
                                    .input("dePrec_Vta", articulo.dePrec_Vta)
                                    .input("sPorc_Desc", null)
                                    .input("deMonto_Desc", 0)
                                    .input("dePorc_Imp", articulo.dePorc_Imp)
                                    .input("dePorc_Imp2", 0)
                                    .input("dePorc_Imp3", 0)
                                    .input("deReng_Neto", articulo.deReng_Neto)
                                    .input("dePendiente", articulo.dePendiente) //igual a deTotal_Art 
                                    .input("dePendiente2", 0)
                                    .input("sTipo_Doc", null)
                                    .input("gRowguid_Doc", null)
                                    .input("sNum_Doc", null)
                                    .input("deMonto_Imp", articulo.deMonto_Imp)
                                    .input("deTotal_Dev", 0)
                                    .input("deMonto_Dev", 0)
                                    .input("deOtros", 0)
                                    .input("deMonto_Imp2", 0)
                                    .input("deMonto_Imp3", 0)
                                    .input("sComentario", null)
                                    .input("sDis_Cen", null)
                                    .input("deMonto_Desc_Glob", 0)
                                    .input("deMonto_Reca_Glob", 0)
                                    .input("deOtros1_Glob", 0)
                                    .input("deOtros2_glob", 0)
                                    .input("deOtros3_glob", 0)
                                    .input("deMonto_imp_afec_glob", 0)
                                    .input("deMonto_imp2_afec_glob", 0)
                                    .input("deMonto_imp3_afec_glob", 0)
                                    .input("iRENG_NUM", index + 1)
                                    .input("sREVISADO", null)
                                    .input("sTRASNFE", null)
                                    .input("sco_sucu_in", coSucur)
                                    .input("sco_us_in", '999')
                                    .input("sMaquina", 'API')
                                    .execute('pInsertarRenglonesPedidoVenta');
            
        console.log('articulo ingresado');
        pool.close();

        });
    } catch (error) {
        console.error(error);
    }
    
};
