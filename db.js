//Importar Sequelize (y otros valores)
const {Sequelize, DataTypes} = require('sequelize');

// Crear una constante Model, para no tener que escribir Sequelize.Model
const Model = Sequelize.Model;

// Vamos a trabajar todo lo de la base de datos con modelos
// Modelo -> representación de una tabla, pero desde código
// > Nombre del modelo -> nombre de la tabla
// > Campos del modelo -> columnas de la tabla
// > funciones del modelo -> Sentencias SQL

// Antes de poder trabajar los modelos, necesitamos establecer una conexión
// con la base de datos

// Conectarse a la base de datos
// 1) nombre de la base de datos
// 2) username de la base de datos
// 3) (Opcional) password de la base de datos

// Nota: el nombre de la base de datos, debe existir
// (ya debe haberse creado la base de datos previamente: CREATE DATABASE twitter;)
// -----------------------------/db name , root , null(no hay password)
const sequelize = new Sequelize('posts','root','',{
    // Mi base de datos y mi servidor están en la misma computadora
    host: 'localhost',
    // Específicamente, vamos a trabajar SQL con MySQL
    dialect: 'mysql'
});

// sequelize va a representar la conexión creada

sequelize
    // Intentar autenticación (conectarse)
    .authenticate()
    // Función callback (instrucciones de qué va a hacer una vez que termine; las instrucciones se proporcionan como una función)
    .then(() => {
        // Cuando se conecte exitosamente
        console.log('MySQL connection successful.')
    })
    .catch((err) => {
        // Cuando no se conecte exitosamente
        // Nota: caso de error recibe una variable err, representando al error al conectarse
        // console.error es para errores
        // , err para poder mostrar el error completo
        console.error('MySQL connection error', err);
    });

// Exportar...
// Un objeto {}
// Que dentro tiene "sequelize" (conexión a la base de datos)
module.exports = {sequelize};