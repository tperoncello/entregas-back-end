const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.path = path;
  }

  async addProduct(nuevoObjeto) {
    try {
      const arrayProductos = await this.leerArchivo();

      let {
        title,
        description,
        price,
        img,
        code,
        stock
      } = nuevoObjeto;

      if (!title || !description || !price || !img || !code || !stock) {
        console.log("Todos los campos son obligatorios, completalos o morirás en 24 hs");
        return;
      }

      if (arrayProductos.some(item => item.code === code)) {
        console.log("El código debe ser único, rata de dos patas!");
        return;
      }

      const newProduct = {
        id: ++ProductManager.ultId,
        title,
        description,
        price,
        img,
        code,
        stock
      };

      arrayProductos.push(newProduct);

      await this.guardarArchivo(arrayProductos);
      console.log("Producto agregado con éxito");
    } catch (error) {
      console.log("Error al agregar un nuevo producto", error);
    }
  }

  async getProducts() {
    try {
      const arrayProductos = await this.leerArchivo();
      return arrayProductos;
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      const buscado = arrayProductos.find(item => item.id === id);

      if (!buscado) {
        console.log("Producto no encontrado");
      } else {
        console.log("Producto encontrado");
        return buscado;
      }
    } catch (error) {
      console.log("Error al obtener el producto por ID", error);
    }
  }

  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
      return [];
    }
  }

  async guardarArchivo(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const arrayProductos = await this.leerArchivo();

      const index = arrayProductos.findIndex(item => item.id === id);

      if (index !== -1) {
        arrayProductos.splice(index, 1, productoActualizado);
        await this.guardarArchivo(arrayProductos);
        console.log("Producto actualizado con éxito");
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }
}

module.exports = ProductManager;