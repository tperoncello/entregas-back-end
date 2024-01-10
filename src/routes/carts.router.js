const express = require("express"); 
const router = express.Router(); 

const ProductManager = require("../controllers/ProductManager.js"); 
const productManager = new ProductManager("./src/models/carrito.json"); 

// Rutas: 

router.get("/carts", async (req, res) => {
    try {
        const carts = await productManager.getProducts(); 
        res.json(carts)
    } catch (error) {
        console.error("Error al obtener el carrito", error); 
        res.json({error: "Error del servidor"});
    }
});

module.exports = router;
