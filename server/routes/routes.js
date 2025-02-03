const Router = require('express')
const router = new Router()

const auth = require('./auth')
router.use('/user', auth)

module.exports = router