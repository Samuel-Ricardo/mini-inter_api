import { Connection, createConnection } from "typeorm";
import express from 'express';

import cors from 'cors';
import routes from "./routes";
import { globalErros } from "./middlewares/globalErros";


createConnection().then(Connection => {

  const app = express();
  const PORT = 3333;

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
