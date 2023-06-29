const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(   // define como vai ser a estrutura e os dados dos documentos de URL's que vamos usar, usando a classe Schema do mongoose
  {
    shortId: {  // propriedade que vai definir que os shortId são requeridos e devem ser únicos
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {  // Url original que o shorturl vai redirecionar
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }], // uma lista que vai guardar o date.now() em que o shorturl foi acessado
  },
  { timestamps: true } // habilita a possibilidade de obtermos o createAt e updateAt do documento
);

const URL = mongoose.model("url", urlSchema); // cria o modelo baseado no urlSchema que vai conversar com a coleção "url"

module.exports = URL;
