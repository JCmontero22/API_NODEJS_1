const { response } = require('express');
var config = require('./dbConfig');
const sql = require('mssql');


async function getAllCategoria() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("SELECT * FROM categoria WHERE categoria_estado = 1");

        return categorias.recordset;
    } catch (error) {
        console.log(error);
    }
}


async function getOneCategoria(id) {
    try {
        let response;
        let pool = await sql.connect(config);
        let categoriaId = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * FROM categoria WHERE id_categoria = @input_parameter AND categoria_estado = 1");

        if (categoriaId.rowsAffected[0] == 0) {
            response = {
                'status' : false,
                'mensaje' : 'No existe registro con ese ID'
            }    
        }else{
            response = categoriaId.recordset;
        }

        return response

    } catch (error) {
        console.log(error);
        
    }
}

async function insertCategoria(categoria) {
    try {
        let pool = await sql.connect(config);
        let insertaCategoria = await pool.request()
            .input('categoria_nombre', sql.VarChar, categoria.categoria_nombre)
            .input('categoria_descripcion', sql.VarChar, categoria.categoria_descripcion)
            .query('INSERT INTO categoria (categoria_nombre, categoria_descripcion) VALUES (@categoria_nombre, @categoria_descripcion)')

        const response = { 
            message: 'Categoría insertada exitosamente', 
            categoria: { 
                categoria_nombre: categoria.categoria_nombre, 
                categoria_descripcion: categoria.categoria_descripcion 
            }, 
            filasAfectadas: insertaCategoria.rowsAffected[0] 
        };

        return response;
    } catch (error) {
        console.log(error);
        
    }
}

async function updateCategoria(categoria) {
    try {
        let pool = await sql.connect(config);
        let actualizarCategoria = await pool.request()
            .input('id_categoria', sql.Int, categoria.id_categoria)
            .input('categoria_nombre', sql.VarChar, categoria.categoria_nombre)
            .input('categoria_descripcion', sql.VarChar, categoria.categoria_descripcion)
            .query('UPDATE categoria SET categoria_nombre = @categoria_nombre, categoria_descripcion = @categoria_descripcion WHERE id_categoria = @id_categoria')

        const response = { 
            message: 'Categoría fue actualizada exitosamente', 
            categoria: { 
                categoria_nombre: categoria.categoria_nombre, 
                categoria_descripcion: categoria.categoria_descripcion 
            }, 
            filasAfectadas: actualizarCategoria.rowsAffected[0] 
        };

        return response;
    } catch (error) {
        console.log(error);
        
    }
}

async function deleteCategoria(id) {
    try {
        let pool = await sql.connect(config);
        let eliminarCategoria = await pool.request()
            .input('id_categoria', sql.Int, id)
            .query('UPDATE categoria SET categoria_estado = 0 WHERE id_categoria = @id_categoria')
            
        const response = { 
            message: 'Categoría fue eliminada exitosamente', 
            categoria: id,
            filasAfectadas: eliminarCategoria.rowsAffected[0] 
        };

        return response;

    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {
    getAllCategoria : getAllCategoria,
    getOneCategoria : getOneCategoria,
    insertCategoria : insertCategoria,
    updateCategoria : updateCategoria,
    deleteCategoria : deleteCategoria
}