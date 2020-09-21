import { GoogleFactCheckParser } from "./googleFactCheckParser"
import { MessageResponseHit, HitResult } from "@/messageResponse/messageResponseHit"
import { MessageResponse } from "@/messageResponse/messageResponse"
import { MessageResponseNoHit } from "@/messageResponse/messageResponseNoHIt"

it("should receive parsed google fact check response without repeating news", () => {
  const googleFactCheckParser = new GoogleFactCheckParser()

  const googleResponse = {
    claims: [
      {
        text:
          "“Bolsonaro e Trump sempre tiveram razão a respeito da OMS. A OMS alerta sobre máscara ser desnecessária para pessoas saudáveis”",
        claimant: 'Página de Facebook "EnDireita Marabá"',
        claimDate: "2020-06-26T08:20:12Z",
        claimReview: [
          {
            publisher: { name: "Observador", site: "observador.pt" },
            url:
              "https://observador.pt/factchecks/fact-check-oms-diz-que-mascaras-sao-desnecessarias-para-pessoas-saudaveis/",
            title: "Fact Check. OMS diz que máscaras são desnecessárias para pessoas saudáveis?",
            reviewDate: "2020-07-17T09:20:11Z",
            textualRating: "Errado",
            languageCode: "pt"
          }
        ]
      },
      {
        text: "Pesquisa Datafolha mostra aprovação de 64% a Jair Bolsonaro",
        claimant: "Boatos de redes sociais",
        claimDate: "2020-07-16T21:39:16Z",
        claimReview: [
          {
            publisher: { name: "Política - Estadão", site: "politica.estadao.com.br" },
            url:
              "https://politica.estadao.com.br/blogs/estadao-verifica/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro/",
            title: "Site usa texto sobre boa aprovação de Lula para tratar de apoio a Bolsonaro",
            reviewDate: "2020-07-16T21:39:16Z",
            textualRating: "Falso",
            languageCode: "pt"
          }
        ]
      },
      {
        text:
          "Conteúdo verificado: Texto publicado no site Notícias de Direita afirmando que o presidente Jair Bolsonaro (sem partido) teria 64% de aprovação",
        claimant: "Jair Bolsonaro",
        claimDate: "2020-07-13T00:00:00Z",
        claimReview: [
          {
            publisher: { name: "Bol.Com - Uol", site: "bol.uol.com.br" },
            url:
              "https://www.bol.uol.com.br/noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm",
            title: "Site usa texto sobre boa aprovação de Lula para tratar de apoio a Bolsonaro",
            reviewDate: "2020-07-16T23:32:42Z",
            textualRating: "Mentira",
            languageCode: "pt"
          },
          {
            publisher: { name: "UOL Notícias", site: "noticias.uol.com.br" },
            url:
              "https://noticias.uol.com.br/comprova/ultimas-noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm",
            title: "Site usa texto sobre boa aprovação de Lula para tratar de apoio a Bolsonaro",
            reviewDate: "2020-07-16T23:32:42Z",
            textualRating: "Mentira",
            languageCode: "pt"
          }
        ]
      }
    ],
    nextPageToken: "CAo"
  }

  const type = "Hit"
  const expectedTestHits: Array<HitResult> = [
    {
      Checado: "Fact Check. OMS diz que máscaras são desnecessárias para pessoas saudáveis?",
      Checado_por: "Observador",
      Data: "17 Julho 2020",
      Link:
        "https://observador.pt/factchecks/fact-check-oms-diz-que-mascaras-sao-desnecessarias-para-pessoas-saudaveis/"
    },
    {
      Checado: "Site usa texto sobre boa aprovação de Lula para tratar de apoio a Bolsonaro",
      Checado_por: "Política - Estadão",
      Data: "16 Julho 2020",
      Link:
        "https://politica.estadao.com.br/blogs/estadao-verifica/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro/"
    }
  ]
  const expectedMessageResponse: MessageResponseHit = {
    type: type,
    hits: expectedTestHits
  }

  const parsedResponse = googleFactCheckParser.parseMessage(JSON.stringify(googleResponse))
  expect(parsedResponse).toEqual(expectedMessageResponse as MessageResponse)
})

it("should receive parsed google fact check response ignoring claimReviews without title", () => {
  const googleFactCheckParser = new GoogleFactCheckParser()

  const googleResponse = {
    claims: [
      {
        text:
          "“Bolsonaro e Trump sempre tiveram razão a respeito da OMS. A OMS alerta sobre máscara ser desnecessária para pessoas saudáveis”",
        claimant: 'Página de Facebook "EnDireita Marabá"',
        claimDate: "2020-06-26T08:20:12Z",
        claimReview: [
          {
            publisher: { name: "Observador", site: "observador.pt" },
            url:
              "https://observador.pt/factchecks/fact-check-oms-diz-que-mascaras-sao-desnecessarias-para-pessoas-saudaveis/",
            title: "Fact Check. OMS diz que máscaras são desnecessárias para pessoas saudáveis?",
            reviewDate: "2020-07-17T09:20:11Z",
            textualRating: "Errado",
            languageCode: "pt"
          }
        ]
      },
      {
        text: "Pesquisa Datafolha mostra aprovação de 64% a Jair Bolsonaro",
        claimant: "Boatos de redes sociais",
        claimDate: "2020-07-16T21:39:16Z",
        claimReview: [
          {
            publisher: { name: "Política - Estadão", site: "politica.estadao.com.br" },
            url:
              "https://politica.estadao.com.br/blogs/estadao-verifica/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro/",
            reviewDate: "2020-07-16T21:39:16Z",
            textualRating: "Falso",
            languageCode: "pt"
          }
        ]
      },
      {
        text:
          "Conteúdo verificado: Texto publicado no site Notícias de Direita afirmando que o presidente Jair Bolsonaro (sem partido) teria 64% de aprovação",
        claimant: "Jair Bolsonaro",
        claimDate: "2020-07-13T00:00:00Z",
        claimReview: [
          {
            publisher: { name: "Bol.Com - Uol", site: "bol.uol.com.br" },
            url:
              "https://www.bol.uol.com.br/noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm",
            reviewDate: "2020-07-16T23:32:42Z",
            textualRating: "Mentira",
            languageCode: "pt"
          },
          {
            publisher: { name: "UOL Notícias", site: "noticias.uol.com.br" },
            url:
              "https://noticias.uol.com.br/comprova/ultimas-noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm",
            title: "Site usa texto sobre boa aprovação de Lula para tratar de apoio a Bolsonaro",
            reviewDate: "2020-07-16T23:32:42Z",
            textualRating: "Mentira",
            languageCode: "pt"
          }
        ]
      }
    ],
    nextPageToken: "CAo"
  }

  const type = "Hit"
  const expectedTestHits: Array<HitResult> = [
    {
      Checado: "Fact Check. OMS diz que máscaras são desnecessárias para pessoas saudáveis?",
      Checado_por: "Observador",
      Data: "17 Julho 2020",
      Link:
        "https://observador.pt/factchecks/fact-check-oms-diz-que-mascaras-sao-desnecessarias-para-pessoas-saudaveis/"
    },
    {
      Checado: "Site usa texto sobre boa aprovação de Lula para tratar de apoio a Bolsonaro",
      Checado_por: "UOL Notícias",
      Data: "16 Julho 2020",
      Link:
        "https://noticias.uol.com.br/comprova/ultimas-noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm"
    }
  ]
  const expectedMessageResponse: MessageResponseHit = {
    type: type,
    hits: expectedTestHits
  }

  const parsedResponse = googleFactCheckParser.parseMessage(JSON.stringify(googleResponse))
  expect(parsedResponse).toEqual(expectedMessageResponse as MessageResponse)
})

it("should return nohitMessageResponse", () => {
  const googleFactCheckParser = new GoogleFactCheckParser()

  const googleResponse = {}

  const type = "NoHit"

  const expectedMessageResponse: MessageResponseNoHit = {
    type: type
  }

  const parsedResponse = googleFactCheckParser.parseMessage(JSON.stringify(googleResponse))
  expect(parsedResponse).toEqual(expectedMessageResponse as MessageResponse)
})

it("should receive noHit response due to all news without title", () => {
  const googleFactCheckParser = new GoogleFactCheckParser()

  const googleResponse = {
    claims: [
      {
        text:
          "“Bolsonaro e Trump sempre tiveram razão a respeito da OMS. A OMS alerta sobre máscara ser desnecessária para pessoas saudáveis”",
        claimant: 'Página de Facebook "EnDireita Marabá"',
        claimDate: "2020-06-26T08:20:12Z",
        claimReview: [
          {
            publisher: { name: "Observador", site: "observador.pt" },
            url:
              "https://observador.pt/factchecks/fact-check-oms-diz-que-mascaras-sao-desnecessarias-para-pessoas-saudaveis/",
            reviewDate: "2020-07-17T09:20:11Z",
            textualRating: "Errado",
            languageCode: "pt"
          }
        ]
      },
      {
        text: "Pesquisa Datafolha mostra aprovação de 64% a Jair Bolsonaro",
        claimant: "Boatos de redes sociais",
        claimDate: "2020-07-16T21:39:16Z",
        claimReview: [
          {
            publisher: { name: "Política - Estadão", site: "politica.estadao.com.br" },
            url:
              "https://politica.estadao.com.br/blogs/estadao-verifica/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro/",
            reviewDate: "2020-07-16T21:39:16Z",
            textualRating: "Falso",
            languageCode: "pt"
          }
        ]
      },
      {
        text:
          "Conteúdo verificado: Texto publicado no site Notícias de Direita afirmando que o presidente Jair Bolsonaro (sem partido) teria 64% de aprovação",
        claimant: "Jair Bolsonaro",
        claimDate: "2020-07-13T00:00:00Z",
        claimReview: [
          {
            publisher: { name: "Bol.Com - Uol", site: "bol.uol.com.br" },
            url:
              "https://www.bol.uol.com.br/noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm",
            reviewDate: "2020-07-16T23:32:42Z",
            textualRating: "Mentira",
            languageCode: "pt"
          },
          {
            publisher: { name: "UOL Notícias", site: "noticias.uol.com.br" },
            url:
              "https://noticias.uol.com.br/comprova/ultimas-noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm",
            reviewDate: "2020-07-16T23:32:42Z",
            textualRating: "Mentira",
            languageCode: "pt"
          }
        ]
      }
    ],
    nextPageToken: "CAo"
  }

  const type = "NoHit"
  const expectedMessageResponse: MessageResponseNoHit = {
    type: type
  }

  const parsedResponse = googleFactCheckParser.parseMessage(JSON.stringify(googleResponse))
  expect(parsedResponse).toEqual(expectedMessageResponse as MessageResponse)
})
