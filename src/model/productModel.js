const mongoose = require ("mongoose")

//PRODUCTOS 
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

module.exports = productosModel;