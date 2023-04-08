const Knex = require('../database/knex');
const AppError = require('../utils/AppError');

class TagsController {
    async show(request, response) {
        const { user_id } = request.params;

        const user = await Knex("users").where({"id": user_id}).first();

        if (!user) {
            throw new AppError("Esse usuário não existe!");
        }

        const tags = await Knex("movie_tags").where({user_id});

        const doesUserHaveTags = tags.length > 0
        
        if (!doesUserHaveTags) {
            throw new AppError("Este usuário não possui tags");
        }

        return response.status(200).json(tags);
    }

    //talvez um update ou delete, pensar nisso
}

module.exports = TagsController;