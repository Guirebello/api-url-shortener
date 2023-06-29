const express = require("express"); // importa o modulo express pra poder cirar o objeto router
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url"); // importa 2 funções específicas do modulo ../controllers/url(../ é relativo a ordem das pastas)

const router = express.Router(); // cria o objeto router que vai manipular os requests

router.post("/", handleGenerateNewShortURL); // quando uma POST request é feita na root(/), a função handleGenerateNewShortURL que vai manipular a request

router.get("/analytics/:shortId", handleGetAnalytics); // quando uma GET request é feita em "/analytics/:shortId", onde :shortId é um valor do parâmetro shortId,a função handleGetAnalytics que vai manipular a request 

module.exports = router; // exporta o objeto router