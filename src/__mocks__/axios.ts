export default {
  post: jest.fn((url: string, data: any) =>
    Promise.resolve({
      data: [
        {
          checado:
            "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
          checado_por: "Agência Lupa",
          data: "13/03/2020",
          link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
        }
      ]
    })
  )
}
