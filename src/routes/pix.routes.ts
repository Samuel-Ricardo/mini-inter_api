import { Router } from "express";
import PixController from "../resources/pix/pix.controller";

const pixRoutes = Router();
const pixController = new PixController();

export default pixRoutes;
