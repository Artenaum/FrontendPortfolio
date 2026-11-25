const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()

const usersPath = path.join(process.cwd(), 'src/server/users.json')
let userdb = JSON.parse(fs.readFileSync(usersPath, 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults())

const SECRET_KEY = 'FASTQWFGSADH'
const expiresIn = '1h'

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err))
}

function isEmailExists({email}) {
    return userdb.users.findIndex((user) => user.email === email) !== -1
}

function isNameExists({name}) {
    return userdb.users.findIndex((user) => user.name === name) !== -1
}

function checkEmailAndPassword({email, password}) {
    return (
        userdb.users.findIndex((user) => user.email === email && user.password === password) !==
        -1
    )
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
    const {email, password, name, role} = req.body

    if (isEmailExists({email})) {
        return res.status(401).json({status: 401, message: 'Такой email уже существует.'})
    }
    if (isNameExists({name})) {
        return res.status(401).json({status: 401, message: 'Такое имя уже существует.'})
    }
    if (!isPasswordValid(password)) {
        return res.status(400).json({
            status: 400,
            message:
                'Пароль не соответствует требованиям безопасности. Он должен содержать минимум 8 символов, включая цифры, прописные и строчные буквы и специальные символы.'
        })
    }
    if (!isNameValid(name)) {
        return res
            .status(400)
            .json({status: 400, message: 'Имя должно содержать не менее 4 символов'})
    }
    if (!isRoleValid(role)) {
        return res
            .status(400)
            .json({status: 400, message: 'Доступные роли: "teacher" || "student"'})
    }

    const last_item_id = userdb.users[userdb.users.length - 1]?.id || 0
    userdb.users.push({id: last_item_id + 1, email, password, name, role})

    const access_token = createToken({email, password})
    return res.status(200).json({access_token})
})

server.post('/auth/login', (req, res) => {
    const {email, password} = req.body
    if (!checkEmailAndPassword({email, password})) {
        return res.status(401).json({status: 401, message: 'Incorrect email or password'})
    }
    const access_token = createToken({email, password})
    const user = userdb.users.find((u) => u.email === email && u.password === password)
    return res.status(200).json({access_token, user_data: user})
})

module.exports = server
