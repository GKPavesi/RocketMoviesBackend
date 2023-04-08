const { Router } = require('express');
const NotesController = require('../controllers/NotesController')

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.get('/:note_id', notesController.show);
notesRoutes.post('/:user_id', notesController.create);
notesRoutes.delete('/:note_id', notesController.delete);

module.exports = notesRoutes;