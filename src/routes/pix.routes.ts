import { Router } from "express";
import userAuthenticated from "../middlewares/userAuthenticated";
import PixController from "../resources/pix/pix.controller";

const pixRoutes = Router();
const pixController = new PixController();

pixRoutes.use(userAuthenticated);

pixRoutes.post('/request', userAuthenticated, pixController.request);
pixRoutes.post('/pay/:key', userAuthenticated, pixController.pay);
pixRoutes.get('/transactions', userAuthenticated, pixController.transactions);

export default pixRoutes;
