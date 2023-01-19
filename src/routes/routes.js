import { Router } from "express";

import { getConsecutivoProximo } from "../controllers/consecutivo.controller";
import { getInventario, getListadoDatosArticulos, getPrecioArticuloOM } from "../controllers/inventario.controller";
import { getVentas } from "../controllers/ventas.controller";
import { getCajas } from "../controllers/cajas_bancos.controller";
import { getCxc } from "../controllers/cxc.controller";
import { getCliente } from "../controllers/clientes.controller";
import { getPedidos, insertPedido} from "../controllers/pedido.controller";



const router = Router();

router.get('/consecutivo/:empresa', getConsecutivoProximo);
router.get('/pedidos/:empresa', getPedidos);
router.post('/pedidos/insertar/:empresa', insertPedido);


router.get('/inventario/:empresa', getInventario);
router.get('/articulos/precios/:empresa', getPrecioArticuloOM);
router.get('/articulos/:empresa', getListadoDatosArticulos);


router.get('/cliente/:empresa', getCliente);

router.get('/cxc/:empresa', getCxc);

router.get('/ventas/:empresa', getVentas);

router.get('/cajas/:empresa', getCajas);

export default router;