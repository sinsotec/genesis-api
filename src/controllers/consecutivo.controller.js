import { getConnection} from "../database/connection.js";


export const getConsecutivoProximo = async (req) => {
    console.log(req);
    console.log("Generando el consecutivo");
    const {tipoDoc, coSucur, empresa} = req;
    const pool = await getConnection(empresa);
    const result = await pool.request()
                            .input("sCo_Consecutivo", tipoDoc)
                            .input("sCo_Sucur", coSucur)
                            .execute('pConsecutivoProximo');
    pool.close();
    const consecutivo = result.recordset[0].ProximoConsecutivo.trim(); 
    console.log(`Consecutivo generado: ${consecutivo}`);
    return consecutivo;
}
