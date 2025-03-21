import connection from '../db.ts'; // Asegúrate de que este archivo exista y exporte la conexión correctamente

// Obtener todos los productos
export const getAll = (req: any, res: any) => {
    connection.query('SELECT * FROM Productos', (err, results) => {
        if (err) {
            console.error('❌ Error al consultar la base de datos:', err);
            return res.status(500).json({ error: 'Error al obtener productos', details: err.message });
        }
        res.json(results);
    });
};

// Insertar un producto
export const insertProductAll = (req: any, res: any) => {
    try {
        const { nombre, descripcion, precio, categoria } = req.body;

        if (!nombre || !descripcion || !precio || !categoria) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (isNaN(precio)) {
            return res.status(400).json({ error: 'El precio debe ser un número válido' });
        }

        const sql = 'INSERT INTO Productos (Nombre, Descripcion, Precio, Categoria) VALUES (?, ?, ?, ?)';
        connection.query(sql, [nombre, descripcion, precio, categoria], (error, results) => {
            if (error) {
                console.error('❌ Error al insertar en la base de datos:', error);
                return res.status(500).json({ error: 'Error al insertar el producto', details: error.message });
            }
            res.status(201).json({ message: '✅ Producto insertado correctamente', id: results.insertId });
        });
    } catch (error) {
        console.error('❌ Error inesperado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Modificar un producto
export const updateProduct = (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, categoria } = req.body;

        if (!id || !nombre || !descripcion || !precio || !categoria) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const sql = 'UPDATE Productos SET Nombre = ?, Descripcion = ?, Precio = ?, Categoria = ? WHERE id = ?';
        connection.query(sql, [nombre, descripcion, precio, categoria, id], (error, results) => {
            if (error) {
                console.error('❌ Error al actualizar el producto:', error);
                return res.status(500).json({ error: 'Error al actualizar el producto', details: error.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: '❌ Producto no encontrado' });
            }
            res.status(200).json({ message: '✅ Producto actualizado correctamente' });
        });
    } catch (error) {
        console.error('❌ Error inesperado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un producto
export const deleteProduct = (req: any, res: any) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'El ID del producto es obligatorio' });
        }

        const sql = 'DELETE FROM Productos WHERE id = ?';
        connection.query(sql, [id], (error, results) => {
            if (error) {
                console.error('❌ Error al eliminar el producto:', error);
                return res.status(500).json({ error: 'Error al eliminar el producto', details: error.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: '❌ Producto no encontrado' });
            }
            res.status(200).json({ message: '✅ Producto eliminado correctamente' });
        });
    } catch (error) {
        console.error('❌ Error inesperado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
