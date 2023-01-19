import { getConnection} from "../database/connection.js";
import { getConsecutivoProximo } from "../controllers/consecutivo.controller";
import {insertRenglonPedido} from "../controllers/renglon_pedido.controller";
import { getFechaAhora} from "../controllers/fecha.controller";


/*import fetch from "node-fetch";


const getConsecutivo = async (empresa, tipoDoc, coSuc) => { 
    return fetch(`http://localhost:3000/consecutivo/${empresa}?tipoDoc=${tipoDoc}&coSucur=${coSuc}`)
            .then(res => res.json())
            .then(data => {return data}) 
    } */

export const getPedidos = async (req, res) => { //crear controlador documentos de venta, y llamar la funcion pasando pedidos
  console.log("Consultando Pedidos");
  //console.log(req.params);
  //console.log(req.query);
  const {empresa} = req.params;
  try{
      const pool = await getConnection(empresa);
      const result = await pool.request()
        .input('sDatabase_Name', empresa)
        .input('sTable_Name', 'saPedidoVenta')
        .input('bUsaOperadorLogicoAND','1')
        .input('sEstatus', '0')
        .execute('pObtenerListadoDatosProcesoVenta') //reporte general para obtener documentos de venta pObtenerListadoDatosProcesoVenta
      pool.close();
    
      let pedidos = [];
      let temp = result.recordset; 
      result.recordset.forEach((pedido, index) =>{
              pedidos.push({
                  'doc_num' : pedido.doc_num.trim(),
                  'co_cli': pedido.co_cli,
                  'fec_emis': pedido.fec_emis,
                  'tasa': pedido.tasa,
                  'total_neto_$': pedido.total_neto,
                  'total_neto_bs': pedido.total_neto * pedido.tasa,
              });
      }); 

      try {
            pedidos.forEach( async (pedido, index) => {
                //console.log(pedido);
                const pool = await getConnection(empresa);
                const result = await pool.request()
                                        .input("sDoc_Num", pedido.doc_num)
                                        .execute('pSeleccionarRenglonesPedidoVenta');
                console.log('Pedido Consultado');
                pool.close();
                let renglonPedido = [];
                result.recordset.forEach((renglon, index) =>{
                    renglonPedido.push({
                        'cod_art': renglon.co_art.trim(),
                        'art_des': renglon.art_des.trim(),
                        'co_uni': renglon.co_uni.trim(),
                        'co_alma': renglon.co_alma.trim(),
                        'tipo_imp': renglon.tipo_imp,
                        'por_imp': renglon.por_imp,
                        'total_art': renglon.total_art,
                        'priceOM': renglon.prec_vta * renglon.tasa,
                        'ivaOM': renglon.monto_imp * renglon.tasa,
                        'total_priceOM': totalPriceOM,
                        'price': price,
                        'iva': iva,
                        'total_price': totalPrice
                    });
            }); 
                //console.log(renglon);
               // pedido.renglon = renglon;
                console.log(result);
            });
        } catch (error) {
         console.error(error);
        }
      //res.json(temp);
      res.json(pedidos);
      //console.log(JSON.stringify(pedidos));
  }catch(error){
      console.error(`El error consultando los clientes fue ${error}`);
  }    
};



export const insertPedido = async (req, res) => {
    try {
        console.log(req.body);
        console.log("params");
        console.log(req.params);
        const {empresa} = req.params;
        const {tipoDoc, coSucur, Co_Cli,
              sCo_Mone, deTasa, deSaldo,
              deTotal_Bruto, deMonto_Imp, deTotal_Neto  } = req.body;
        const proxConsecutivo = await getConsecutivoProximo({tipoDoc, coSucur, empresa});
        const fechaEmis = await getFechaAhora();
        console.log(fechaEmis);

        const pool = await getConnection(empresa);
        const result = await pool.request()
                              .input("sdFec_Emis", fechaEmis)
                              .input("sDoc_Num", proxConsecutivo)
                              .input("sDescrip", null)
                              .input("sCo_Cli", Co_Cli)
                              .input("sCo_Tran", '01')
                              .input("sCo_Cond", '01')
                              .input("sCo_Ven", '08')
                              .input("sCo_Cta_Ingr_Egr", null)
                              .input("sCo_Mone", sCo_Mone)
                              .input("bAnulado", 0)
                              .input("sdFec_Reg", fechaEmis)
                              .input("sdFec_Venc", fechaEmis)
                              .input("sStatus", '0')
                              .input("deTasa", deTasa)
                              .input("sN_Control", null)
                              .input("sPorc_Desc_Glob", null)
                              .input("deMonto_Desc_Glob", 0)
                              .input("sPorc_Reca", null)
                              .input("deMonto_Reca", 0)
                              .input("deSaldo", deSaldo)
                              .input("deTotal_Bruto", deTotal_Bruto)
                              .input("deMonto_Imp", deMonto_Imp)
                              .input("deMonto_Imp3", 0)
                              .input("deOtros1", 0)
                              .input("deOtros2", 0)
                              .input("deOtros3", 0)
                              .input("deMonto_Imp2", 0)
                              .input("deTotal_Neto", deTotal_Neto)
                              .input("sComentario", null)
                              .input("sDir_Ent", null)
                              .input("bContrib", 1)
                              .input("bImpresa", 0)
                              .input("sSalestax", null)
                              .input("sImpfis", null)
                              .input("sImpfisfac", null)
                              .input("bVen_Ter", 0)
                              .input("sDis_Cen", null)
                              .input("sCampo1", null)
                              .input("sCampo2", null)
                              .input("sCampo3", null)
                              .input("sCampo4", null)
                              .input("sCampo5", null)
                              .input("sCampo6", null)
                              .input("sCampo7", null)
                              .input("sCampo8", null)
                              .input("sRevisado", null)
                              .input("sTrasnfe", null)
                              .input("sco_sucu_in", coSucur)
                              .input("sco_us_in", '999')
                              .input("sMaquina", 'API')
                              .execute('pInsertarPedidoVenta');               
        pool.close();
        const data = {
                    params: {empresa: empresa}, 
                    body:{
                      sDoc_Num: proxConsecutivo,
                      coSucur: coSucur,
                      articulos: req.body.art
                    }
                  };
        console.log(data.body);
        await insertRenglonPedido(data); //validar que es correcto para enviar el res
        res.send(proxConsecutivo);
    } catch (error) {
        console.error(error);
    }
};
