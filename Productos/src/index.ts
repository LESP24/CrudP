import express from "express";
import dotenv from "dotenv";
import productosRoutes from "./routes/productos.routes.ts";


dotenv.config({path:"/home/taller4O/Productos/src/.env"});

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());

app.use("/Productos", productosRoutes)

//const port = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log("Mi primer Servicio de Productos! Puerto:", PORT);
});