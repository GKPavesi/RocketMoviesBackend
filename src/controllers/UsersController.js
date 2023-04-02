const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { hash, compare } = require('bcryptjs');

class UsersController {
    async create(request, response) {
        
        const { name, email, password, avatar } = request.body;

        const missingFields = !name || !email || !password;

        if (missingFields) {
            throw new AppError("Você deve enviar todos os campos obrigatórios!");
        }

        const emailAlreadyUsed = (await knex("users").where("email", email)).length > 0;

        if (emailAlreadyUsed) {
            throw new AppError("Esse email já foi cadastrado!");
        }

        const isPasswordTooShort = password.length < 6;

        if (isPasswordTooShort) {
            throw new AppError("Sua senha deve ter no minimo 6 caracteres.");
        }

        const hashedPassword = await hash(password, 8);

        const userId = (await knex("users").insert({ name, email, password: hashedPassword, avatar }))[0];

        return response.status(201).json({
            "status": "success",
            "message": "Usuário criado com sucesso.",
            "id": userId
        })
    }

    async update(request, response) {

        let { name, email, password, newPassword, avatar } = request.body;
        const { id } = request.params;

        const user = await knex("users").where("id", id).first();
        
        if (!user) {
            throw new AppError("Usuário não existe.");
        }

        const missingFields = !password;

        if (missingFields) {
            throw new AppError("Você deve enviar todos os campos obrigatórios");
        }

        const isCorrectPassword = await compare(password, user.password);

        if (!isCorrectPassword) {
            throw new AppError("Senha errada!");
        }

        let updatedUser = {}

        if (newPassword) {
            const isNewPasswordTooShort = newPassword.length < 6;

            if (isNewPasswordTooShort) {
                throw new AppError("A nova senha é muito curta!");
            }

            updatedUser.password = await hash(newPassword, 8);
        } else {
            updatedUser.password = user.password;
        }

        const isNewEmail = ((user.email !== email) && (email));
        
        if (isNewEmail) {
            const doesNewEmailExists = (await knex("users").where("email", email)).length > 0;

            if (doesNewEmailExists) {
                throw new AppError("Já existe um usuário com esse novo email.")
            }

            updatedUser.email = email;
        } else {
            updatedUser.email = user.email;
        }

        updatedUser.name = name || user.name;
        updatedUser.avatar = avatar || user.avatar;

        await knex("users").where("id", id).update({
            ...updatedUser,
            updated_at: knex.fn.now()
        })
    
        return response.status(200).json({
            "status": "success",
            "message": "Usuário atualizado com sucesso.",
            "id": id
        })
    }
}

module.exports = UsersController;