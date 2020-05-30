//interface que definida pela estrutura do json respondido pelo db
/* atualmente de acordo com o seguinte exemplo:

 {

  "Checado": "É falso que homem foi enterrado vivo e dado como morto pela" ------> caso venha nulo significa que nao deu hit no banco
  "Confianca": "0.5578327",
  "Data": "2020-05-25 00:00:00",
  "Checado_por": "G1",
  "Link": "https://g1.globo.com/fato-ou-fake/coronavirus/noticia/2020/05/25/e-fake-que-homem-foi-enterrado-vivo-e-dado-como-morto-pela-covid-19-na-bahia.ghtml"
}

*/

export interface DataBaseResponse {


    checado: string // em caso de nao haver hit no banco vem como NULL
    confianca: string //nao se sabe ainda se vem como string ou float
    data: string
    checado_por: string
    link: string


}