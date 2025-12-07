const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./database.json')
const userdb = JSON.parse(fs.readFileSync('src/server/users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults())

const SECRET_KEY = 'FASTQWFGSADH'

const expiresIn = '1h'

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err))
}

function isEmailExists({ email }) {
  const userdb = JSON.parse(fs.readFileSync('src/server/users.json', 'UTF-8'))
  return userdb.users.findIndex((user) => user.email === email) !== -1
}

function isNameExists({ name }) {
  const userdb = JSON.parse(fs.readFileSync('src/server/users.json', 'UTF-8'))
  return userdb.users.findIndex((user) => user.name === name) !== -1
}

function checkEmailAndPassword({ email, password }) {
  const userdb = JSON.parse(fs.readFileSync('src/server/users.json', 'UTF-8'))
  return userdb.users.findIndex((user) => user.email === email && user.password === password) !== -1
}

function isPasswordValid(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  return regex.test(password)
}

function isNameValid(name) {
  return name.trim().length > 3
}

function isRoleValid(role) {
  return role === 'teacher' || role === 'student'
}

server.post('/auth/register', (req, res) => {
  console.log('register endpoint called; request body:')
  console.log(req.body)
  const { email, password, name, role } = req.body

  if (isEmailExists({ email })) {
    const status = 401
    const message = 'Такой email уже существует.'
    res.status(status).json({ status, message })
    return
  }

  if (isNameExists({ name })) {
    const status = 401
    const message = 'Такое имя уже существует.'
    res.status(status).json({ status, message })
    return
  }

  if (!isPasswordValid(password)) {
    const status = 400
    const message =
      'Пароль не соответствует требованиям безопасности. Он должен содержать минимум 8 символов, включая цифры, прописные и строчные буквы и специальные символы.'
    res.status(status).json({ status, message })
    return
  }

  if (!isNameValid(name)) {
    const status = 400
    const message = 'Имя должно содержать не менее 4 символов'
    res.status(status).json({ status, message })
    return
  }

  if (!isRoleValid(role)) {
    const status = 400
    const message = 'Доступные роли: "teacher" || "student"'
    res.status(status).json({ status, message })
    return
  }

  fs.readFile('src/server/users.json', (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({ status, message })
      return
    }

    var data = JSON.parse(data.toString())

    var last_item_id = data.users[data.users.length - 1]?.id || 0

    data.users.push({ id: last_item_id + 1, email, password, name, role }) //add some data
    var writeData = fs.writeFile('src/server/users.json', JSON.stringify(data), (err, result) => {
      // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({ status, message })
        return
      }
    })
  })

  const access_token = createToken({ email, password })
  console.log('Access Token:' + access_token)
  res.status(200).json({ access_token })
})

server.post('/auth/login', (req, res) => {
  console.log('login endpoint called; request body:')
  console.log(req.body)
  const { email, password } = req.body
  if (checkEmailAndPassword({ email, password }) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({ status, message })
    return
  }
  const access_token = createToken({ email, password })
  console.log('Access Token:' + access_token)
  const userdb = JSON.parse(fs.readFileSync('src/server/users.json', 'UTF-8'))
  const user = userdb.users.find((user) => user.email === email && user.password === password)
  res.status(200).json({ access_token, user_data: user })
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({ status, message })
    return
  }
  try {
    let verifyTokenResult
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1])

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided'
      res.status(status).json({ status, message })
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({ status, message })
  }
})

server.use(router)

server.listen(8000, () => {
  console.log('Run Auth API Server')
})
