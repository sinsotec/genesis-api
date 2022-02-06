import { Router } from "express";

import { getInventario } from "../controllers/inventario.controller";
import { getVentas } from "../controllers/ventas.controller";
import { getCajas } from "../controllers/cajas_bancos.controller";


const router = Router();

router.get('/inventario', getInventario);

router.get('/ventas', getVentas);

router.get('/cajas', getCajas);



export default router;