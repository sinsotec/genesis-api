import { Router } from "express";

import { getArticulos } from "../controllers/articulos.controller";

const router = Router();

router.get('/articulos', getArticulos);

export default router;