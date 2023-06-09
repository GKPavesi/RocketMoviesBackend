const Knex = require('../database/knex');
const AppError = require('../utils/AppError');

class NotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const { user_id } = request.params;

        const user = await Knex("users").where({"id": user_id}).first();

        if (!user) {
            throw new AppError("Essa usuário não existe!")
        }

        const missingFields = !title || !description || (!rating && rating !== 0) || !tags || tags.length == 0;

        if (missingFields) {
            throw new AppError("Você tem que enviar todos os campos obrigatórios");
        }

        const doesRatingHaveError = (typeof rating !== 'number' || rating > 5 || rating < 0 || !Number.isInteger(rating))

        if (doesRatingHaveError) {
            throw new AppError("Rating deve ser um número inteiro e deve estar entre 0 e 5")
        }

        const note_id = await Knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        })

        const tagsToInsert = tags.map(tag => {
            return {
                "name": tag,
                "note_id": note_id[0],
                user_id
            }
        })

        let tags_ids = await Knex("movie_tags").insert(tagsToInsert).returning("id");

        tags_ids = tags_ids.map(tag => tag.id);

        return response.status(201).json({
            "status": "success",
            "message": "Nota criada com sucesso",
            "id": note_id[0],
            "tags_id": tags_ids 
        })
    }

    async show(request, response) {
        const { note_id } = request.params;

        const note = await Knex("movie_notes").where({"id": note_id}).first();

        if (!note) {
            throw new AppError("Essa nota não existe!")
        }

        const tags = await Knex("movie_tags").where({ note_id }).orderBy("name");

        return response.status(200).json({
            ...note,
            tags
        })
    }


    async delete(request, response) {
        const { note_id } = request.params;

        const note = await Knex("movie_notes").where({"id": note_id}).first();

        if (!note) {
            throw new AppError("Essa nota não existe!")
        }

        await Knex("movie_notes").where({"id": note_id}).delete();

        return response.status(200).json({
            "status": "success",
            "message": "Nota deletada com sucesso",
            "id": note_id,
        })
    }

    //index e update
}

module.exports = NotesController;