const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

const dbPath = path.join(process.cwd(), 'src/shared/db/FilaraDB.json')
const initialData = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'))
const router = jsonServer.router(initialData)

server.use(middlewares)
server.use((req, res, next) => {
    req.url = req.url.replace(/^\/api/, '') || '/'
    next()
})
server.use(router)

module.exports = server
