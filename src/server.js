require('express-async-errors');

const express = require('express');
const routes = require('./routes');

const AppError = require('./utils/AppError');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    console.log(error)
    
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
})


app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
})

//começar primeiras rotas, ja tentar estruturar da maneira "correta e legal"

//apos estruturar isso começar database e ja tentar estruturar de maneira 
//correta e legal também, fazer tudo com o knex , inclusive as migrations
//instalar as dependencias necessarias pra tudo!
//controllers, usar classes
//express errors pra tratar os erros
//bcrypt pra password
//dar uma olhada em todas as libs que instalei no outro projeto
//usar o path


//ver todas as lib
//entender bem como ta funcionando tudo, principalmente as rotas, nao ficar com duvida em nada



///agora começar a logica de tudo no backend, a base ja está montada
//fazer logica no insomnia tbm

///fazer umas logicas pra password também e essas coisas, deixar bem completo


//talvez melhorar e refatorar as logicas de tudo
///pensar bem nas validações de tudo, principalmente do user

//verificar tudo, se ta tudo ok!