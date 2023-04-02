const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class UsersController {
    async teste(request, response) {
        
        return response.status(200).json({"batendo": "notes controller"})
    }
}

module.exports = UsersController;