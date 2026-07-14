// 1. Importacion Express
const express = require('express');

// 2. Creación de una instancia de la aplicación
const app = express();

// 3. Definición de el puerto donde va a "escuchar" el servidor
const PORT = 3000;

// 4. Creación de un endpoint (una "puerta de entrada") para la ruta principal
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// 5. Servidor "escucha" peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});