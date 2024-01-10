const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Rutas
app.get('/', async (req, res) => {
  try {
    const productosData = await fs.readFile('./src/models/productos.json', 'utf-8');
    const productos = JSON.parse(productosData);

    const cartData = await fs.readFile('./src/models/carrito.json', 'utf-8');
    const cart = JSON.parse(cartData);

    const htmlResponse = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            margin: 50px;
          }
  
          h1 {
            color: #333;
          }
  
          p {
            margin: 10px 0;
          }
  
          a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
          }
  
          a:hover {
            text-decoration: underline;
          }
        </style>
        <!--estilos inesesarios pero que quedan de 10 😶‍🌫️-->
      </head>
      <body>
        <h1>¡¡¡Hola bienvenido a mi primer API!!!</h1>
        <p>Visita la lista de productos: <a href="/products">Productos</a></p>
        <p>Visita el contenido en el carrito: <a href="/cart">Carrito</a></p>
      </body>
    </html>
  `;
  

    res.send(htmlResponse);
  } catch (error) {
    console.error('Error al leer productos o carrito', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para mostrar productos
app.get('/products', async (req, res) => {
  try {
    const productosData = await fs.readFile('./src/models/productos.json', 'utf-8');
    const productos = JSON.parse(productosData);
    res.json(productos);
  } catch (error) {
    console.error('Error al leer productos', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para mostrar el carrito
app.get('/cart', async (req, res) => {
  try {
    const cartData = await fs.readFile('./src/models/carrito.json', 'utf-8');
    const cart = JSON.parse(cartData);
    res.json(cart);
  } catch (error) {
    console.error('Error al leer el carrito', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
