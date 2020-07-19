import { GoogleFactCheckFilter } from "./googleFactCheckFilter"
import { HitResult } from "@/messageResponse/messageResponseHit"

it("should remove news with repeated title and return 3 news", () => {
  const factCheckFilter = new GoogleFactCheckFilter()

  const inputHits: Array<HitResult> = [
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
    },
    {
      Checado: "Site usa texto sobre boa aprovação de Lula para tratar de apoio a Bolsonaro",
      Checado_por: "Bol.Com - Uol",
      Data: "16 Julho 2020",
      Link:
        "https://www.bol.uol.com.br/noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm"
    },
    {
      Checado: "Bol.com uol nao eh agencia lupa",
      Checado_por: "Bol.Com - Uol",
      Data: "16 Julho 2020",
      Link:
        "https://www.bol.uol.com.br/noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm"
    },
    {
      Checado: "Bol.com uol nao eh estadao",
      Checado_por: "Bol.Com - Uol",
      Data: "16 Julho 2020",
      Link:
        "https://www.bol.uol.com.br/noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm"
    }
  ]
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
    },
    {
      Checado: "Bol.com uol nao eh agencia lupa",
      Checado_por: "Bol.Com - Uol",
      Data: "16 Julho 2020",
      Link:
        "https://www.bol.uol.com.br/noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm"
    }
  ]

  const hits = factCheckFilter.filterFactCheckHits(inputHits)
  expect(hits).toEqual(expectedTestHits)
})

it("should remove news with repeated title and return 2 news", () => {
  const factCheckFilter = new GoogleFactCheckFilter()

  const inputHits: Array<HitResult> = [
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
    },
    {
      Checado: "Site usa texto sobre boa aprovação de Lula para tratar de apoio a Bolsonaro",
      Checado_por: "Bol.Com - Uol",
      Data: "16 Julho 2020",
      Link:
        "https://www.bol.uol.com.br/noticias/2020/07/16/site-usa-texto-sobre-boa-aprovacao-de-lula-para-tratar-de-apoio-a-bolsonaro.htm"
    }
  ]
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

  const hits = factCheckFilter.filterFactCheckHits(inputHits)
  expect(hits).toEqual(expectedTestHits)
})
