const fs = require('fs')

class Contenedor {
    constructor(filename) {
        this.filename = filename
    }

    async save(product) {
        const contenido = await this.getAll()
        const contenidoJson = JSON.parse(contenido)

        if (contenidoJson.length == 0) {
            product.id = 1
            contenidoJson.push(product)
        } else {
            product.id = contenidoJson[contenidoJson.length - 1].id + 1
            contenidoJson.push(product)
        }

        await fs.promises.writeFile(this.filename, JSON.stringify(contenidoJson))
    }

    async getById(id) {
        const contenido = await this.getAll()
        const contenidoJson = JSON.parse(contenido)

        return contenidoJson.filter(producto => producto['id'] == id)[0]
        
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.filename, 'utf-8')
            return contenido
        } catch (err) {
            throw new Error(`Error al abrir el archivo: ${err}`)
        }
    }

    async deleteById(id) {
        const contenido = await this.getAll()
        const contenidoJson = JSON.parse(contenido)

        await fs.promises.writeFile(this.filename, JSON.stringify(contenidoJson.filter(element => element.id != id))) //splice borra 1 elemento a partir de la posición ${id}
    }

    async deleteAll() {
        await fs.promises.writeFile(this.filename, JSON.stringify([])) //borro todos los elementos
    }
}

module.exports = Contenedor