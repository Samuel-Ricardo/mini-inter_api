import { Router } from "express";
import userAuthenticated from "../middlewares/userAuthenticated";
import PixController from "../resources/pix/pix.controller";

const pixRoutes = Router();
const pixController = new PixController();

pixRoutes.use(userAuthenticated);

pixRoutes.post('/request', pixController.request);
pixRoutes.post('/pay/:key', pixController.pay);
pixRoutes.get('/transactions', pixController.transactions);

export default pixRoutes;
