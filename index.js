const express = require("express");                 // guarda o modulo 'express' na variável express
const { connectToMongoDB } = require("./connect");  // extraimos apenas a função connectToMongoDB do modulo ./connect e guardamos em uma variável local de mesmo nome da função
const urlRoute = require("./routes/url");           // guarda o modulo './routes/url' na variável urlRoute
const URL = require("./models/url");                // guarda o modulo './models/url' na variável URL

const app = express();                              // cria o objeto 'app' que é uma instância da aplicação Express.js
const PORT = 9443;                                  // estabelece a porta na qual o server vai ouvir HTTP requests, nesse caso 9443

connectToMongoDB("mongodb://127.0.0.1/short-url").then(() => // passa o parametro("url") para connectar a mongoDB na url passada
  console.log("Mongodb connected")                           // assim que a promisse resolve, ou seja, foi bem sucedida, é printado "Mongodb connect"
);

app.use(express.static("./public"))

app.use(express.json());      // middleware built-in do express que faz o parsing em .json files permitindo o acesso dos dados delas pros meus handlers

app.use("/url", urlRoute);    // delega as request /url sejam manipuladas pelo urlRoute(./routes/url)

app.get("/:shortId", async (req, res) => {          // "/:shortId" pega o valor do Id, que vai ficar disponível em req.params
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate( // cria uma variável que vai guardar o metodo findOneAndUpdate pra procurar na mongodb o documento na coleçao URL que combine com o valor do shortId 
    {
      shortId,   
    },
    {
      $push: {   // atualiza o documento colocando um novo objeto na lista visitHistory, com o tempo que o arquivo foi ascessado
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);  // redireciona uma response ao client
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
