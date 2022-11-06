const mongoose = require('mongoose');
const express = require('express')

const url  ="mongodb://localhost/GymBro"
const app = express()
const port = 3000

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




   
app.get('/', (req, res) => {
  res.send('Inicio con login!')
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
  console.log(`Example app listening on port ${port}`)
})
mostrar()