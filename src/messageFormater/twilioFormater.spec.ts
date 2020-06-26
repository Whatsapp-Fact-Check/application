import { TwilioFormater } from "./twilioFormater"
const MessagingResponse = require("twilio").twiml.MessagingResponse

test("should return twilio formated string", () => {
  const twiml = new MessagingResponse()
  let instance = new TwilioFormater()
  let expected = "Infelizmente não conseguimos localizar nenhuma checagem relacionada com a frase enviada. "
  let message: string = "Infelizmente não conseguimos localizar nenhuma checagem relacionada com a frase enviada. "
  expect(instance.format(message)).toStrictEqual(twiml.message(expected).toString())
})

test("should truncate message", () => {
  const twiml = new MessagingResponse()
  let instance = new TwilioFormater()
  let expected: string =
    "Encontrei 2 registro(s) sobre esse tema! A seguir separei os mais relevantes:\n\n" +
    "Fato verificado: É falso que OMS incentive masturbação infantil em diretriz sobre educação sexual\n" +
    "Verificado por: G1\n" +
    "Data da verificação: 16/05/2020\n" +
    "Link: https://g1.globo.com/fato-ou-fake/coronavirus/noticia/2020/05/04/e-fake-que-oms-incentive-masturbacao-infantil-em-diretriz-sobre-educacao-sexual.ghtml" +
    "\n\n" +
    "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
    "Verificado por:  Aos Fatos\n" +
    "Data da verificação: 20/06/2020\n" +
    "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
    "\n\n" +
    "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
    "Verificado por:  Aos Fatos\n" +
    "Data da verificação: 20/06/2020\n" +
    "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
    "\n\n" +
    "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
    "Verificado por:  Aos Fatos\n" +
    "Data da verificação: 20/06/2020\n" +
    "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
    "\n\n" +
    "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
    "Verificado por:  Aos Fatos\n" +
    "Data da verificação: 20/06/2020\n" +
    "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/2"

  let message: string =
    "Encontrei 2 registro(s) sobre esse tema! A seguir separei os mais relevantes:\n\n" +
    "Fato verificado: É falso que OMS incentive masturbação infantil em diretriz sobre educação sexual\n" +
    "Verificado por: G1\n" +
    "Data da verificação: 16/05/2020\n" +
    "Link: https://g1.globo.com/fato-ou-fake/coronavirus/noticia/2020/05/04/e-fake-que-oms-incentive-masturbacao-infantil-em-diretriz-sobre-educacao-sexual.ghtml" +
    "\n\n" +
    "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
    "Verificado por:  Aos Fatos\n" +
    "Data da verificação: 20/06/2020\n" +
    "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
    "\n\n" +
    "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
    "Verificado por:  Aos Fatos\n" +
    "Data da verificação: 20/06/2020\n" +
    "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
    "\n\n" +
    "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
    "Verificado por:  Aos Fatos\n" +
    "Data da verificação: 20/06/2020\n" +
    "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
    "\n\n" +
    "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
    "Verificado por:  Aos Fatos\n" +
    "Data da verificação: 20/06/2020\n" +
    "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/2" +
    "\n\n" +
    "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
    "Verificado por:  Aos Fatos\n" +
    "Data da verificação: 20/06/2020\n" +
    "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/"

  expect(instance.format(message)).toStrictEqual(twiml.message(expected).toString())
})

// test("should truncate message without finding double line", () => {
//   const twiml = new MessagingResponse()
//   let instance = new TwilioFormater()
//   let expected: string =
//     "Encontrei 2 registro(s) sobre esse tema! A seguir separei os mais relevantes:\n\n" +
//     "Fato verificado: É falso que OMS incentive masturbação infantil em diretriz sobre educação sexual\n" +
//     "Verificado por: G1\n" +
//     "Data da verificação: 16/05/2020\n" +
//     "Link: https://g1.globo.com/fato-ou-fake/coronavirus/noticia/2020/05/04/e-fake-que-oms-incentive-masturbacao-infantil-em-diretriz-sobre-educacao-sexual.ghtml" +
//     "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
//     "Verificado por:  Aos Fatos\n" +
//     "Data da verificação: 20/06/2020\n" +
//     "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
//     "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
//     "Verificado por:  Aos Fatos\n" +
//     "Data da verificação: 20/06/2020\n" +
//     "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
//     "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
//     "Verificado por:  Aos Fatos\n" +
//     "Data da verificação: 20/06/2020\n" +
//     "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
//     "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
//     "Verificado por:  Aos Fatos\n" +
//     "Data da verificação: 20/06/2020\n" +
//     "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/2"

//   let message: string =
//     "Encontrei 2 registro(s) sobre esse tema! A seguir separei os mais relevantes:" +
//     "Fato verificado: É falso que OMS incentive masturbação infantil em diretriz sobre educação sexual\n" +
//     "Verificado por: G1\n" +
//     "Data da verificação: 16/05/2020\n" +
//     "Link: https://g1.globo.com/fato-ou-fake/coronavirus/noticia/2020/05/04/e-fake-que-oms-incentive-masturbacao-infantil-em-diretriz-sobre-educacao-sexual.ghtml" +
//     "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
//     "Verificado por:  Aos Fatos\n" +
//     "Data da verificação: 20/06/2020\n" +
//     "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
//     "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
//     "Verificado por:  Aos Fatos\n" +
//     "Data da verificação: 20/06/2020\n" +
//     "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
//     "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
//     "Verificado por:  Aos Fatos\n" +
//     "Data da verificação: 20/06/2020\n" +
//     "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/" +
//     "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
//     "Verificado por:  Aos Fatos\n" +
//     "Data da verificação: 20/06/2020\n" +
//     "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/2" +
//     "Fato verificado: É falso que políticas educacionais da OMS incentivam a masturbação infantil\n" +
//     "Verificado por:  Aos Fatos\n" +
//     "Data da verificação: 20/06/2020\n" +
//     "Link: https://www.aosfatos.org/noticias/e-falso-que-politicas-educacionais-da-oms-incentivam-masturbacao-infantil/"

//   instance.format(message)
// })