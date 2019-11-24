const express = require('express')
const router = express.Router() 

const tasksController = require('../app/controllers/tasksController')
const labelsController = require('../app/controllers/labelsController')
const usersController = require('../app/controllers/usersController')
const authenticateUser = require("../app/middlewares/authentication")

router.post('/users/register', usersController.create)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.show)
router.delete('/users/logout', authenticateUser, usersController.destroy)
router.delete('/users/logoutAll', authenticateUser, usersController.destroyAll)
router.post('/users/profile', authenticateUser, usersController.profile)

router.get('/tasks', authenticateUser, tasksController.list)
router.post('/tasks', authenticateUser, tasksController.create)
router.get('/tasks/:id',authenticateUser, tasksController.show)
router.delete('/tasks/:id', authenticateUser, tasksController.destroy)
router.put('/tasks/:id', authenticateUser, tasksController.update)

router.get('/labels', authenticateUser, labelsController.list)
router.post('/labels', authenticateUser, labelsController.create) 
router.get('/labels/:id', authenticateUser, labelsController.show)
router.put('/labels/:id', authenticateUser, labelsController.update)
router.delete('/labels/:id', authenticateUser, labelsController.destroy) 


module.exports = router