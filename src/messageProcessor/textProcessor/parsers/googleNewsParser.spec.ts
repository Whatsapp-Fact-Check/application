import { GoogleNewsParser } from "./googleNewsParser"
import { MessageResponseNoHit, News } from "@/messageResponse/messageResponseNoHIt"
import { MessageResponseHit } from "@/messageResponse/messageResponseHit"
import { MessageResponseErrorInternal } from "@/messageResponse/messageResponseError"
import { HttpError } from "../../http/httpRequest"

const newsWith3Items: Array<News> = [
  {
    Title: "Ibaneis recorre de decisão judicial que suspende reabertura no DF",
    Link:
      "https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml",
    Date: "09 Julho 2020",
    Source: "Correio Braziliense"
  },
  {
    Title: "Ibaneis recorre de decisão judicial que suspende reabertura no DF",
    Link:
      "https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml",
    Date: "09 Julho 2020",
    Source: "Correio Braziliense"
  },
  {
    Title: "Ibaneis recorre de decisão judicial que suspende reabertura no DF",
    Link:
      "https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml",
    Date: "09 Julho 2020",
    Source: "Correio Braziliense"
  }
]

const newsWith2Items: Array<News> = [
  {
    Title: "Ibaneis recorre de decisão judicial que suspende reabertura no DF",
    Link:
      "https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml",
    Date: "09 Julho 2020",
    Source: "Correio Braziliense"
  },
  {
    Title: "Ibaneis recorre de decisão judicial que suspende reabertura no DF",
    Link:
      "https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml",
    Date: "09 Julho 2020",
    Source: "Correio Braziliense"
  }
]

it("should receive an xml error response", async () => {
  const parser = new GoogleNewsParser()

  const type = "Error"
  const errorMessage = "Google News Xml Parser: "

  const expectedMessageResponse: MessageResponseErrorInternal = {
    type: type,
    errorInternal: { error: new Error(errorMessage) }
  }

  const parsedResponse = (await parser.parseMessage(JSON.stringify("jair bolsonaro"))) as MessageResponseErrorInternal

  expect(parsedResponse.type).toEqual(expectedMessageResponse.type)
  expect(parsedResponse.errorInternal.error.message.includes(errorMessage)).toEqual(true)
})

it("should receive an error response coming from httpError", async () => {
  const parser = new GoogleNewsParser()

  const type = "Error"
  const errorMessage = "HttpError"

  const expectedMessageResponse: MessageResponseErrorInternal = {
    type: type,
    errorInternal: { error: new Error(errorMessage) }
  }

  const httpError: HttpError = {
    error: errorMessage
  }

  const parsedResponse = (await parser.parseMessage(httpError)) as MessageResponseErrorInternal
  expect(parsedResponse).toEqual(expectedMessageResponse)
})

it("should receive a noHit response without related news", async () => {
  const parser = new GoogleNewsParser()

  const emptyRss = '<rss xmlns:media="http://search.yahoo.com/mrss/" version="2.0">\
  <script/>\
  <channel>\
  <description>Google Notícias</description>\
  </channel>\
  </rss>'
  
  const type = "NoHit"

  const expectedMessageResponse: MessageResponseNoHit = {
    type: type
  }

  const parsedResponse = (await parser.parseMessage(JSON.stringify(emptyRss))) as MessageResponseNoHit

  expect(parsedResponse).toEqual(expectedMessageResponse)
})

it("should receive a noHit response with 2 related news", async () => {
  const parser = new GoogleNewsParser()

  let populatedRss =
    '<rss xmlns:media="http://search.yahoo.com/mrss/" version="2.0">\
  <script/>\
  <channel>\
  <description>Google Notícias</description>\
  <item>\
  <title>Ibaneis recorre de decisão judicial que suspende reabertura no DF - Correio Braziliense</title>\
  <link>https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml</link>\
  <guid isPermaLink="false">52781779992213</guid>\
  <pubDate>Thu, 09 Jul 2020 12:25:00 GMT</pubDate>\
  <description><ol><li><a href="https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml" target="_blank">Ibaneis recorre de decisão judicial que suspende reabertura no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Correio Braziliense</font></li><li><a href="https://www.metropoles.com/colunas-blogs/grande-angular/ibaneis-assina-novo-decreto-que-esclarece-o-que-pode-ou-nao-reabrir" target="_blank">Ibaneis assina novo decreto que esclarece o que pode ou não reabrir</a>&nbsp;&nbsp;<font color="#6f6f6f">Metrópoles</font></li><li><a href="https://g1.globo.com/df/distrito-federal/noticia/2020/07/09/covid-19-ibaneis-determina-que-rede-privada-conceda-65-leitos-de-uti-ao-df.ghtml" target="_blank">Covid-19: Ibaneis determina que rede privada conceda 65 leitos de UTI ao DF</a>&nbsp;&nbsp;<font color="#6f6f6f">G1</font></li><li><a href="https://congressoemfoco.uol.com.br/saude/oposicao-entra-na-justica-contra-reabertura-decretada-por-ibaneis-no-df/" target="_blank">Oposição entra na Justiça contra reabertura decretada por Ibaneis no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Congresso em Foco</font></li><li><a href="https://brasil.estadao.com.br/noticias/geral,justica-manda-ibaneis-suspender-reabertura-de-industria-bares-escolas-e-restaurantes-no-df,70003357867" target="_blank">Justiça manda Ibaneis suspender reabertura de indústria, bares, escolas e restaurantes no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Brasil Estadão</font></li><li><strong><a href="https://news.google.com/stories/CAAqOQgKIjNDQklTSURvSmMzUnZjbmt0TXpZd1NoTUtFUWlWX2Z5NWs0QU1FUUdKMVU5SlprME5LQUFQAQ?oc=5" target="_blank">Ver Cobertura completa no Google Notícias</a></strong></li></ol></description>\
  <source url="https://www.correiobraziliense.com.br">Correio Braziliense</source>\
  </item>\
  <item>\
  <title>Ibaneis recorre de decisão judicial que suspende reabertura no DF - Correio Braziliense</title>\
  <link>https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml</link>\
  <guid isPermaLink="false">52781779992213</guid>\
  <pubDate>Thu, 09 Jul 2020 12:25:00 GMT</pubDate>\
  <description><ol><li><a href="https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml" target="_blank">Ibaneis recorre de decisão judicial que suspende reabertura no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Correio Braziliense</font></li><li><a href="https://www.metropoles.com/colunas-blogs/grande-angular/ibaneis-assina-novo-decreto-que-esclarece-o-que-pode-ou-nao-reabrir" target="_blank">Ibaneis assina novo decreto que esclarece o que pode ou não reabrir</a>&nbsp;&nbsp;<font color="#6f6f6f">Metrópoles</font></li><li><a href="https://g1.globo.com/df/distrito-federal/noticia/2020/07/09/covid-19-ibaneis-determina-que-rede-privada-conceda-65-leitos-de-uti-ao-df.ghtml" target="_blank">Covid-19: Ibaneis determina que rede privada conceda 65 leitos de UTI ao DF</a>&nbsp;&nbsp;<font color="#6f6f6f">G1</font></li><li><a href="https://congressoemfoco.uol.com.br/saude/oposicao-entra-na-justica-contra-reabertura-decretada-por-ibaneis-no-df/" target="_blank">Oposição entra na Justiça contra reabertura decretada por Ibaneis no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Congresso em Foco</font></li><li><a href="https://brasil.estadao.com.br/noticias/geral,justica-manda-ibaneis-suspender-reabertura-de-industria-bares-escolas-e-restaurantes-no-df,70003357867" target="_blank">Justiça manda Ibaneis suspender reabertura de indústria, bares, escolas e restaurantes no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Brasil Estadão</font></li><li><strong><a href="https://news.google.com/stories/CAAqOQgKIjNDQklTSURvSmMzUnZjbmt0TXpZd1NoTUtFUWlWX2Z5NWs0QU1FUUdKMVU5SlprME5LQUFQAQ?oc=5" target="_blank">Ver Cobertura completa no Google Notícias</a></strong></li></ol></description>\
  <source url="https://www.correiobraziliense.com.br">Correio Braziliense</source>\
  </item>\
  </channel>\
  </rss>'

  const type = "NoHit"

  const expectedMessageResponse: MessageResponseNoHit = {
    type: type,
    relatedNews: newsWith2Items
  }

  let parsedResponse = await parser.parseMessage(JSON.stringify(populatedRss))
  let parsedResponseNoHit = parsedResponse as MessageResponseNoHit
  expect(parsedResponseNoHit).toEqual(expectedMessageResponse)
})


it("should receive a noHit response with 3 related news", async () => {
    const parser = new GoogleNewsParser()
  
    let populatedRss =
      '<rss xmlns:media="http://search.yahoo.com/mrss/" version="2.0">\
    <script/>\
    <channel>\
    <description>Google Notícias</description>\
    <item>\
    <title>Ibaneis recorre de decisão judicial que suspende reabertura no DF - Correio Braziliense</title>\
    <link>https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml</link>\
    <guid isPermaLink="false">52781779992213</guid>\
    <pubDate>Thu, 09 Jul 2020 12:25:00 GMT</pubDate>\
    <description><ol><li><a href="https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml" target="_blank">Ibaneis recorre de decisão judicial que suspende reabertura no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Correio Braziliense</font></li><li><a href="https://www.metropoles.com/colunas-blogs/grande-angular/ibaneis-assina-novo-decreto-que-esclarece-o-que-pode-ou-nao-reabrir" target="_blank">Ibaneis assina novo decreto que esclarece o que pode ou não reabrir</a>&nbsp;&nbsp;<font color="#6f6f6f">Metrópoles</font></li><li><a href="https://g1.globo.com/df/distrito-federal/noticia/2020/07/09/covid-19-ibaneis-determina-que-rede-privada-conceda-65-leitos-de-uti-ao-df.ghtml" target="_blank">Covid-19: Ibaneis determina que rede privada conceda 65 leitos de UTI ao DF</a>&nbsp;&nbsp;<font color="#6f6f6f">G1</font></li><li><a href="https://congressoemfoco.uol.com.br/saude/oposicao-entra-na-justica-contra-reabertura-decretada-por-ibaneis-no-df/" target="_blank">Oposição entra na Justiça contra reabertura decretada por Ibaneis no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Congresso em Foco</font></li><li><a href="https://brasil.estadao.com.br/noticias/geral,justica-manda-ibaneis-suspender-reabertura-de-industria-bares-escolas-e-restaurantes-no-df,70003357867" target="_blank">Justiça manda Ibaneis suspender reabertura de indústria, bares, escolas e restaurantes no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Brasil Estadão</font></li><li><strong><a href="https://news.google.com/stories/CAAqOQgKIjNDQklTSURvSmMzUnZjbmt0TXpZd1NoTUtFUWlWX2Z5NWs0QU1FUUdKMVU5SlprME5LQUFQAQ?oc=5" target="_blank">Ver Cobertura completa no Google Notícias</a></strong></li></ol></description>\
    <source url="https://www.correiobraziliense.com.br">Correio Braziliense</source>\
    </item>\
    <item>\
    <title>Ibaneis recorre de decisão judicial que suspende reabertura no DF - Correio Braziliense</title>\
    <link>https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml</link>\
    <guid isPermaLink="false">52781779992213</guid>\
    <pubDate>Thu, 09 Jul 2020 12:25:00 GMT</pubDate>\
    <description><ol><li><a href="https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml" target="_blank">Ibaneis recorre de decisão judicial que suspende reabertura no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Correio Braziliense</font></li><li><a href="https://www.metropoles.com/colunas-blogs/grande-angular/ibaneis-assina-novo-decreto-que-esclarece-o-que-pode-ou-nao-reabrir" target="_blank">Ibaneis assina novo decreto que esclarece o que pode ou não reabrir</a>&nbsp;&nbsp;<font color="#6f6f6f">Metrópoles</font></li><li><a href="https://g1.globo.com/df/distrito-federal/noticia/2020/07/09/covid-19-ibaneis-determina-que-rede-privada-conceda-65-leitos-de-uti-ao-df.ghtml" target="_blank">Covid-19: Ibaneis determina que rede privada conceda 65 leitos de UTI ao DF</a>&nbsp;&nbsp;<font color="#6f6f6f">G1</font></li><li><a href="https://congressoemfoco.uol.com.br/saude/oposicao-entra-na-justica-contra-reabertura-decretada-por-ibaneis-no-df/" target="_blank">Oposição entra na Justiça contra reabertura decretada por Ibaneis no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Congresso em Foco</font></li><li><a href="https://brasil.estadao.com.br/noticias/geral,justica-manda-ibaneis-suspender-reabertura-de-industria-bares-escolas-e-restaurantes-no-df,70003357867" target="_blank">Justiça manda Ibaneis suspender reabertura de indústria, bares, escolas e restaurantes no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Brasil Estadão</font></li><li><strong><a href="https://news.google.com/stories/CAAqOQgKIjNDQklTSURvSmMzUnZjbmt0TXpZd1NoTUtFUWlWX2Z5NWs0QU1FUUdKMVU5SlprME5LQUFQAQ?oc=5" target="_blank">Ver Cobertura completa no Google Notícias</a></strong></li></ol></description>\
    <source url="https://www.correiobraziliense.com.br">Correio Braziliense</source>\
    </item>\
    <item>\
    <title>Ibaneis recorre de decisão judicial que suspende reabertura no DF - Correio Braziliense</title>\
    <link>https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml</link>\
    <guid isPermaLink="false">52781779992213</guid>\
    <pubDate>Thu, 09 Jul 2020 12:25:00 GMT</pubDate>\
    <description><ol><li><a href="https://www.correiobraziliense.com.br/app/noticia/cidades/2020/07/09/interna_cidadesdf,870691/ibaneis-recorre-de-decisao-judicial-que-suspende-reabertura-no-df.shtml" target="_blank">Ibaneis recorre de decisão judicial que suspende reabertura no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Correio Braziliense</font></li><li><a href="https://www.metropoles.com/colunas-blogs/grande-angular/ibaneis-assina-novo-decreto-que-esclarece-o-que-pode-ou-nao-reabrir" target="_blank">Ibaneis assina novo decreto que esclarece o que pode ou não reabrir</a>&nbsp;&nbsp;<font color="#6f6f6f">Metrópoles</font></li><li><a href="https://g1.globo.com/df/distrito-federal/noticia/2020/07/09/covid-19-ibaneis-determina-que-rede-privada-conceda-65-leitos-de-uti-ao-df.ghtml" target="_blank">Covid-19: Ibaneis determina que rede privada conceda 65 leitos de UTI ao DF</a>&nbsp;&nbsp;<font color="#6f6f6f">G1</font></li><li><a href="https://congressoemfoco.uol.com.br/saude/oposicao-entra-na-justica-contra-reabertura-decretada-por-ibaneis-no-df/" target="_blank">Oposição entra na Justiça contra reabertura decretada por Ibaneis no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Congresso em Foco</font></li><li><a href="https://brasil.estadao.com.br/noticias/geral,justica-manda-ibaneis-suspender-reabertura-de-industria-bares-escolas-e-restaurantes-no-df,70003357867" target="_blank">Justiça manda Ibaneis suspender reabertura de indústria, bares, escolas e restaurantes no DF</a>&nbsp;&nbsp;<font color="#6f6f6f">Brasil Estadão</font></li><li><strong><a href="https://news.google.com/stories/CAAqOQgKIjNDQklTSURvSmMzUnZjbmt0TXpZd1NoTUtFUWlWX2Z5NWs0QU1FUUdKMVU5SlprME5LQUFQAQ?oc=5" target="_blank">Ver Cobertura completa no Google Notícias</a></strong></li></ol></description>\
    <source url="https://www.correiobraziliense.com.br">Correio Braziliense</source>\
    </item>\
    </channel>\
    </rss>'
  
    const type = "NoHit"
  
    const expectedMessageResponse: MessageResponseNoHit = {
      type: type,
      relatedNews: newsWith3Items
    }
  
    let parsedResponse = await parser.parseMessage(JSON.stringify(populatedRss))
    let parsedResponseNoHit = parsedResponse as MessageResponseNoHit
    expect(parsedResponseNoHit).toEqual(expectedMessageResponse)
  })
  