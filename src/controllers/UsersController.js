const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class UsersController {
    async teste(request, response) {
        throw new AppError("Mensagem personalizada de erro funcionando!!!!")
        // throw new Error("just a test");
        const teste = [
        {
            "name": "Gui",
            "email": "emailtestegui@gmail.com",
            "password": "123456",

        },
        {
            "name": "Luzia",
            "email": "emailtesteluzia@gmail.com",
            "password": "12345678",

        }
        ]

        await knex("users").insert(teste)

        response.json("Criado")
    }
}

module.exports = UsersController;