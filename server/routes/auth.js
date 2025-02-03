const Router = require('express')
const routes = new Router()
const Auth = require('../controllers/auth')
const authMiddleware = require('../middlewares/auth')

routes.post('/registration', Auth.registration)
routes.post('/login', Auth.login)
routes.get('/auth', authMiddleware, Auth.check)
routes.get('/logout', authMiddleware, Auth.logout)

module.exports = routes