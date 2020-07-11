import { NoHitFormater } from "./noHitFormater"
import { MessageResponseNoHit, News } from "../messageResponse/messageResponseNoHIt"

const bold = "*"
const newLine = "\n"

test("should return no hit and no related news message", () => {
  const type = "NoHit"
  const instance = new NoHitFormater()
  const expected = "Não encontramos nada correspondente 😓\n\n" +
  "Tente mandar de novo mudando um pouco a frase, usando sinônimos... Pode ser que isso ajude a gente a encontrar!"
  const messageResponse: MessageResponseNoHit = {
    type: type
  }
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})


test("should return related news response", () => {
  const type = "NoHit"
  const instance = new NoHitFormater()
  const news: News[] =  [
    {
      Title: "OI",
      Date: "22 Jun 2018",
      Source: "Fonte",
      Link: "http://oi.com"
    }
  ]

  const expected = "Infelizmente não conseguimos encontrar nenhuma checagem de" +
  " fakeNews sobre o tema, mas buscamos algumas notícias na internet relacionadas ao assunto que você pesquisou 👇\n\n" +
  formatNews(news[0])

  const messageResponse: MessageResponseNoHit = {
    type: type,
    relatedNews: news
  }
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})

function formatNews(news: News): string {
  const formattedString =
    `Notícia: ${bold + news.Title}${bold + newLine}` +
    `Fonte: ${bold + news.Source}${bold + newLine}` +
    `Data da notícia: ${bold+ news.Date}${bold + newLine}` +
    `Link: ${news.Link}`

  return formattedString
}
