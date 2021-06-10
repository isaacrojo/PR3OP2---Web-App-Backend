const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");
// Importar el archivo que está en /config/db.js
// Un objeto, que dentro tiene a "sequelize"
const {sequelize} = require("./config/db");
const {Post} = require("./models/model.post");
const {Comment} = require("./models/model.comment");
const app = express();
const port = 3000;

Post.hasMany(Comment);

// Solamente utilizar force: true para aplicar cambios sobre modelos/tablas
// Borra toda la información para poder ajustar los modelos/tablas
// Nota: profesionalmente, se utiliza algo llamado "Migrations"
//sequelize.sync({force: true});

// Una vez que tenemos los modelos, omitimos el force para que la información se mantenga
sequelize.sync({});

app.set("view engine", "ejs");

// Variables

// Rutas
app.use(express.static("public"));

// Configurar app para poder usar req.body
app.use(bodyParser.urlencoded({ extended: false }));

// Read
// url:  '/'
app.get("/", (req, res) => {

    (async () => {
        // Consultar todos los "Post" desde la base de datos
        let posts = await Post.findAll();

        //esto escribe en la consola nomas jaja
        console.log('posts.length', posts.length);
        posts.forEach((post) => {
            console.log('post.name', post.name);
            console.log('post.content', post.content);

        });

        // Renderizar (mostrar) el archivo ejs: /views/pages/index.ejs
        res.render("pages/index", {
            // Pasar la información de los juegos al ejs (html) para mostrarlos
            // Permitir que el template utilice una variable posts: cuyo valor será la variable posts
            // Nombre variable en template: valor que tendrá
            posts: posts,
            //aqui lo imprtante es que le pasamos al ejs la variabale posts
        });
    })();

});

// Update
app.get('update/:id', (req, res, next) => {
    // Variables de la url con :, están disponibles desde req.params
    let id = req.params.id;
    // Consultar de la base de datos, y mostrar un formulario para editar los datos
    // existentes
    (async () => {
        let post = await Post.findByPk(id);

        res.render('pages/update', {
            post: post,
        });
    })();
});

app.post('/update', (req, res, next) => {
    let id = req.body.id;
    let name = req.body.name;
    let content = req.body.content;


    (async () => {
        // Reconsultamos el registro de la BD
        let post = await Post.findByPk(id);

        // Actualizamos sus valores
        post.name = name;
        post.content = content;

        // Actualizamos la base de datos
        await post.save();

        res.redirect('/');
    })();
});

// Create Post, parte 1   (Get es pal cliente)
// Cuando alguien ingrese a la url "/create" (localhost:3000/create), se hace esto
// Entregar el formulario para creación
app.get("/create", (req, res) => {
    res.render("pages/create");
});


// Create Post, parte 2    (Post es para el jale del server)
// Cuando alguien envíe información mediante POST a la url "/create" (localhost:3000/create), se hace esto
// Leer el "formulario" (los inputs del formulario) y realmente crear el registro en la base de datos
app.post('/create', (req, res) => {
    console.log("Name:", req.body.name);
    console.log("Content:", req.body.content);
    
    let postId = req.body.postId;
    let name = req.body.name;
    let content = req.body.content;

    (async () => {
        let post = await Post.create({
            name: name,
            content: content,
            // postId es una columna que se agrega automáticamente debido a la relación
            // entre ambos modelos
            postId: postId,
        });

        res.redirect('/');
    })();
});

// CREATE Comment Part1- Agregar vista para ver detalles de un registro
// (localhost:3000/comments) se hace esto:

app.get('/comments/:id', (req, res, next)=> {
    let id = req.params.id;

    (async () => {
        // Consultar un registro "comments" en Posts de la DB
        let post = await Post.findByPk(id);


        let comments = await Comment.findAll({
            where: {
                postId: id,
            },
        });
        
        

        res.render("pages/comments", {
        // Pasar la información de los details al ejs (html) para mostrarlos
        // Permitir que el template utilice las variables   
            post: post,
            comments: comments,
        });

    })();

});

// CREATE Comment  Part2- Agregar vista para ver detalles de un registro
// Cuando alguien envíe información mediante POST a la url "/details" (localhost:3000/details), se hace esto
// Leer el "formulario" (los inputs del formulario) y realmente crear el registro en la base de datos
app.post('/comments/create', (req, res, next) => {
    let postId = req.body.postId;
    let username = req.body.username;
    let content = req.body.content;


    (async () => {
        // Crear un nuevo Detail (registro en la base de datos) usando la
        // información obtenida desde el formulario
        //let totalComments = comments.length;
        
        await Comment.create({
            username: username,
            content: content,
            // postId es una columna que se agrega automáticamente debido a la relación
            // entre ambos modelos
            postId: postId,
        });

        // let totalComments = post.numCom +1;
        //let totalComments = comments.length;
        //console.log('comments.length', comments.length);
        // Redireccionar al usuario
        res.redirect('/comments/' + postId);
    })();
});


// Not Found
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    let message = err.message;
    let error = err;

    res.status(err.status || 500);
    res.render("pages/error", {
        message,
        error
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});