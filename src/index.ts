import { Connection, createConnection } from "typeorm";
import express from 'express';

import cors from 'cors';
import routes from "./routes";
import { globalErros } from "./middlewares/globalErros";


createConnection().then(Connection => {

  
}).catch((error) => {
  console.log("Unable to connect to the database", error);
})
