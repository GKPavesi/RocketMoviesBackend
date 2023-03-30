const express = require('express');
const routes = require('./src/routes');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(routes);


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