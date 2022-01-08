import { Router } from "express";
import PixController from "../resources/pix/pix.controller";

const pixRoutes = Router();
const pixController = new PixController();

pixRoutes.post('/request', pixController.request);


export default pixRoutes;
