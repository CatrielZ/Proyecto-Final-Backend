const _dirname = require("./dirname")
const config = require("./config/config");
const logger = require("./utils/logger");
const productosModel = require ("./model/productModel");

const mongoose = require('mongoose');
const express = require('express');
const path = require("path");
const rutas = require ('./routes/index')
const bcrypt = require("bcrypt");
const session = require ("express-session");
const mongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const cluster = require ("cluster");
const os = require("os");
const cors = require("cors");
const passport = require ("./services/passportService.js");ç



console.log(_dirname)
const url  ="mongodb://localhost/GymBro"
const app = express()
const port = 3000;
app.use(cors());

const isCluster = config.MODO == "CLUSTER";
const numCpus = os.cpus().length;

mongoose.connect(url, {
}).then(() => console.log("Se conecto a la base gymbro"))
.catch((error) =>  console.log("Error de conexion"+ error));

if (isCluster && cluster.isPrimary) {
    for (let index = 0; index < numCpus; index++) {
        cluster.fork();
    }

    cluster.on("exit", (worker)=>{
        cluster.fork();
    })
    
}else{
    
    const dbClient = DBFactory.createDBclient(config.DATABASE);
    dbClient.connect();

    app.use(cookieParser());

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(express.static(`${__dirname}/public`));

    //MOTOR EJS
    app.set("views", path.join(__dirname, './views'));
    app.set('view engine','.ejs')

     //Config de sessions almacenadas en mongo ATLAS.
     const mongoOptions = {
        useNewUrlParser: true, 
        useUnifiedTopology: true};
    
     const sessionMiddleware = session({
         store: mongoStore.create({mongoUrl: url, mongoOptions}),
         secret: "catriel",
         resave: false,
         saveUninitialized: false,
         rolling: true,
         cookie:{
             maxAge: Number(config.SESSION_TIME)
         }
     })
 
     app.use(sessionMiddleware);

     //Inicializacion de passport
     app.use(passport.initialize());
     app.use(passport.session());
 
     app.use(router);
 
     const server = app.listen(config.PORT, ()=> logger.info(`Server listening on port: ${config.PORT}`));
     server.on("error", err => logger.error(`Oh no! Something is broken on the server: ${err}`));
 
     //Conexion websockets (para el chat).
     const io = new IOServer(server);
 
     //Middleware para incluir la session de passport en la conexión de socket.io, y asi poder acceder al user que tiene la sesión activa.
     const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
     io.use(wrap(sessionMiddleware));
     io.use(wrap(passport.initialize()));
     io.use(wrap(passport.session()));
     
     io.on("connection", wsChatController);
 }

//Mostrar
const mostrar = async () => {
    const productos = await productosModel.find();
    console.log( productos)
    return productos
}


app.use('/', rutas)
app.use('/register', rutas)


  app.post('/', (req, res) => {
    //Guardar session
  })
  app.get('/productos', (req, res) => {
      res.send(mostrar())
  })
  app.get('/productos:Categorias', (req, res) => {
      res.send('Categorias')
  })
  app.get('/carrito', (req, res) => {
      res.send('ESTE VA A SER EL CARRITO')
  })
  app.get('/carrito:id', (req, res) => {
      res.send('Se podra modificar el carrito')
  })
  app.get('/productos/:id', (req, res) => {
      res.send("producttos descripcion")
  })         
  
  app.listen(port, () => {
    console.log(`ESCUCHANDO PUERTO:  ${port}`)
  })
mostrar()