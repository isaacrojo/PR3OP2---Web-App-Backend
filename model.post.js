const {Sequelize, DataTypes} = require('sequelize');
const Model = Sequelize.Model;
const {sequelize} = require('./../config/db');

// Crear el modelo (tabla)
// Nombre del modelo debe ser con mayúscula al inicio
// en singular
// "Crear un modelo llamado Game" / "tabla llamada games"
class Post extends Model {};

// Configurar al modelo / la tabla
Post.init({
    // 1) Configurar sus campos / las columnas de la tabla

    // Agregar columna name
    name: {
        // VARCHAR
        type: DataTypes.STRING,
        // NON NULL (obligatorio)
        allowNull: false,
    },
    content: {
        // VARCHAR
        type: DataTypes.STRING,
        // NON NULL (obligatorio)
        allowNull: false,
    },
    /* numCom: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, */

}, {
    // 2) Información adicional para el modelo

    // Conexión (requerida)
    sequelize,
    // Renombrar tabla a minúsculas (opcional)
    // la tabla se llamará "post" 
    modelName: 'post',
});

// Exportar un objeto, que dentro tiene al modelo Game
module.exports = {Post};