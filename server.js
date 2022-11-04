const express = require('express')
const app = express()
const port = 3000

const productos = [{
    id: 1,
    name: "Mancuerna 10 kg",
    precio: 11584,
    categoria: "mancuernas",
    cantidad: 24,
    image: "foto.jpg",
    descripcion: "Mancuerna Hexagonal excelente calidad, recubiertas en goma de alta densidad con agarre antideslizante"
},
{
    id: 2,
    name: "Banco De Pecho Pesas Plano",
    precio: 30399,
    categoria: "maquinas de fuerza",
    cantidad: 11,
    image: "foto.jpg",
    descripcion: "Banco de Pecho Y Abdominales Regulable Plegable 4 EN 1"
},
{
    id: 3,
    name: "Barra Z",
    precio: 14950,
    categoria: "barras",
    cantidad: 32,
    image: "foto.jpg",
    descripcion: "BARRA EZ 30mm 120cm a rosca GET FIT!"
},
{
    id: 4,
    name: "Set 2 Mancuernas A Rosca Maciza + 20 Kg Discos Pesas",
    precio: 8339,
    categoria: "mancuernas",
    cantidad: 24,
    image: "foto.jpg",
    descripcion: "KIT de 20 kg. MANCUERNA A ROSCA Y DISCOS PVC SONNOS Posibilidades de armado con este kit: Puedes armar 2 Mancuernas con 10 kg. c/u o 1 mancuerna con 20 Kg"
},
{
    id: 5,
    name: "Multifuerza Multipower Sentadilla Smith Gravedad Cero",
    precio: 150897,
    categoria: "maquinas de fuerza",
    cantidad: 14,
    image: "foto.jpg",
    descripcion: "Multifuerza Sentadilla Smith Gravedad Cero"
},
]
app.get('/', (req, res) => {
  res.send('Inicio con login!')
})
app.get('/productos', (req, res) => {
    res.send(productos)
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