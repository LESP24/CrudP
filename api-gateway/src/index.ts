import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { apiGatewayRoutes } from "./routes/index.ts"; 

dotenv.config({ path: "/home/taller4O/api-gateway/src/.env" });

const app = express();
const PORT = process.env.PORT || 3002;

app.use("/api-gateway", apiGatewayRoutes); 

app.listen(PORT, () => {
  console.log("Mi primer Servicio de Productos! Puerto:", PORT);
});

app.get("/usuarios", async (req, res) => {
  const Respuesta = await axios.get("http://localhost:3009/usuarios/all");
  res.send(Respuesta.data);
}); 

app.get("/Productos", async (req, res) => {
  const Respuesta = await axios.get("http://localhost:3001/Productos/all");
  res.send(Respuesta.data);
}); 
