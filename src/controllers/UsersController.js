const knex = require('../database/knex');

class UsersController {
    async teste(request, response) {

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