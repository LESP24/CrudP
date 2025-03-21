import { Router } from 'express';
import { getAll, insertProduct, updateProduct, deleteProduct } from '../controllers/productos.controller.ts';

const router = Router();

// Definir las rutas
router.get('/all', getAll); // Ruta GET /productos
router.post('/all', insertProduct); // Ruta POST /productos
router.put('/all/:id', updateProduct); // Modificar un producto
router.delete('/all/:id', deleteProduct); // Eliminar un producto

export default router;