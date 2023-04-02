const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { hash, compare } = require('bcryptjs')

class UsersController {
    async create(request, response) {
        
        const { name, email, password, avatar } = request.body;

        const missingFields = !name || !email || !password;

        if (missingFields) {
            throw new AppError("Você deve enviar todos os campos obrigatórios!")
        }

        const emailAlreadyUsed = (await knex("users").where("email", email)).length > 0;

        if (emailAlreadyUsed) {
            throw new AppError("Esse email já foi cadastrado!")
        }

        const isPasswordTooShort = password.length < 6;

        if (isPasswordTooShort) {
            throw new AppError("Sua senha deve ter no minimo 6 caracteres.")
        }

        const hashedPassword = await hash(password, 8);

        await knex("users").insert({ name, email, password: hashedPassword, avatar })

        response.status(201).json({
            "status": "success",
            "message": "Usuário criado com sucesso."
        })
    }
}

module.exports = UsersController;