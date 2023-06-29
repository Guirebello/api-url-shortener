# API encurtadora de links
Encurta links para um id escolhido pelo usuário

feita usando nodejs com express e mongodb

para encurtar o link envie uma GET request para a url **localhost:9443/url** com o body sendo uma json file e nela, escreva:

{ <br>
    "url": "https://pagina-de-exemplo.com/noticia/id/blablabla" <br>
    "shortid": "PaginaExemplo"
<br>
}

a response será http://localhost:9443/PaginaExemplo que será a nova url encurtada.


além disso é possível visualizar quantos clicks um link encurtado teve, mandando uma GET request para a url **localhost:9443/url/analytics/id_que_queremos_analisar**