//import __dirname from './dirname';
const mongoose = require('mongoose');
const express = require('express')
const path = require("path")
const rutas = require ('./routes/index')
const register = require ('./routes/register')

const url  ="mongodb://localhost/GymBro"
const app = express()
const port = 3000;

mongoose.connect(url, {
}).then(() => console.log("Se conecto a la base gymbro"))
.catch((error) =>  console.log("Error de conexion"+ error));

const productosSchema = mongoose.Schema({

    _id: String,   
    name : String,
    precio: Number,
    categoria: String,
    cantidad : Number,
    image: String,
    descripcion: String,
})
//model
const productosModel = mongoose.model('productos', productosSchema);
//Mostrar
const mostrar = async () => {
    const productos = await productosModel.find();
    console.log( productos)
    return productos
}


app.set("views", path.join(__dirname, './views'));
app.set('view engine','.ejs')

app.use('/', rutas)


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