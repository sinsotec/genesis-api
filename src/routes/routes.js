import { Router } from "express";

import { getInventario } from "../controllers/inventario.controller";
import { getVentas } from "../controllers/ventas.controller";
import { getCajas } from "../controllers/cajas_bancos.controller";


const router = Router();

router.get('/inventario/:empresa', getInventario);

router.get('/ventas/:empresa', getVentas);

router.get('/cajas/:empresa', getCajas);



export default router;