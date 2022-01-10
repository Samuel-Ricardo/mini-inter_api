import { createConnection } from "typeorm";
import {orm_config} from './config/orm_config';

import express from 'express';

import cors from 'cors';
import routes from "./routes";
import { globalErros } from "./middlewares/globalErros";

console.log('EXISTE')

console.log('')

createConnection().then(connection => {

//connection.connect();


console.log('conectou')
console.log('')
  console.log(connection.isConnected);

  const app = express();
  const PORT = process.env.PORT || 3333;

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  app.use(globalErros);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  });

}).catch((error) => {
  console.log("Unable to connect to the database", error);
})
