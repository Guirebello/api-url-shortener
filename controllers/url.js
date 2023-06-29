const URL = require("../models/url"); // permite o ascesso ao modelo URL que atua na database

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    if (!body.shortId) return res.status(400).json({ error: "shortId is required" });
  
    const shortId = body.shortId;
  
    try {  // o try-catch foi usado para identificar possiveis erros nesse bloco de código, que cuida dessa parte de geração do link e checagem na base de dados
      const existingURL = await URL.findOne({ shortId });
      if (existingURL) {
        return res.status(409).json({ error: "shortId already exists" });  // Procura se o shortId já existe no banco de dados
      }
  
      const createdURL = await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
      });
  
      const responseURL = `http://localhost:9443/${createdURL.shortId}`; 
  
      return res.json({ newurl: responseURL }); // retorna ao cliente a nova url com o shortid escolhido
    } catch (error) {
      console.error(error); // Mostra o erro no console, útil para ajudar a descobrir a causa do erro
      return res.status(500).json({ error: "Error generating short URL" });
    }
}
async function handleGetAnalytics(req, res) { // pega a propriedade visitHistory do shortId passado pra ela e checa o tamanho do array, dando assim o número de visitas
  const shortId = req.params.shortId;

  try { // o try-catch foi usado para identificar possiveis erros nesse bloco de código, que cuida dessa parte de geração do link e checagem na base de dados
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory, // alem da quantidade de visitas, printa tbm o proprio array de visitas
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
