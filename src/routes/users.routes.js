const { Router } = require('express');
const UsersController = require('../controllers/UsersController')

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.get('/', usersController.teste)

module.exports = userRoutes;

//importar controller aq