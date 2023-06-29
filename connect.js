const mongoose = require("mongoose"); // guarda o modulo 'mongoose' na variável mongoose
mongoose.set("strictQuery", true); // habilita globalmente stric mode queries, que previne que uma query tente manipular um campo que não está definido no urlSchema(./models/url)
async function connectToMongoDB(url) { // define a função async connectToMongoDB, ou seja faz uma promisse e retorna e resolução da promisse quando a mongoDB connecta na url passada como parâmetro
  return mongoose.connect(url);
}

module.exports = { // exporta a função, deixando-a disponível para o uso em outros arquivos
  connectToMongoDB,
};
