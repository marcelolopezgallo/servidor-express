const Contenedor = require('./contenedor.js')
const express = require('express')


const contenedor = new Contenedor('./productos.txt')
const app = express()

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Página de Inicio!</h1>')
})

async function productos(req, res) {
    const base = await contenedor.getAll()
    
    res.json(JSON.parse(base))
}

app.get('/productos', productos)

async function productoRandom(req, res) {
    const base = JSON.parse(await contenedor.getAll())

    res.send(base[Math.floor(Math.random() * base.length)])
}

app.get('/productoRandom', productoRandom)