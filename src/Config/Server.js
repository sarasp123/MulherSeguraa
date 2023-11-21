// server.js
import express from 'express';
import db from './dbConnection';

const server = express();

server.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 3306;

// Remova o trecho abaixo, pois o expo-sqlite não utiliza o conceito de pool
// A conexão é aberta apenas quando necessário

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
