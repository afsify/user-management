const express = require('express')
const admin_router = express.Router()
const adminController = require("../controller/admin.controller")


admin_router.post('/login', adminController.login)
admin_router.post('/insert-user', adminController.insertUser)
admin_router.get('/get-user', adminController.getUser)
admin_router.post('/edit', adminController.editUser)
admin_router.delete('/delete-user/:userId', adminController.deleteUser)


module.exports = admin_router