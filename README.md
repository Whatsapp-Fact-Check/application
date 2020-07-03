# João
João é uma ferramenta de pesquisa rápida no Whatsapp feita para lutar contra a desinformação e propagação de notícias falsas. Já sabemos que as famosas Fake News
são um grande problema da sociedade contemporänea, podendo influenciar diretamente a opinião política dos indivíduos e, consequentemente na própria democracia.
Atualmente, a questão é tão central que novos serviços especializados em julgar a veracidade de notícias surgiram - são as agências verificadoras de fatos. Tais organizações
têm o objetivo de identificar notícias compartilhadas em massa e definir, baseado em argumentos e fatos verídicos, se tal informação é verdadeira. Um exemplo concreto é a
checagem de uma notícia falsa que afirmava que mistura de jambu, limão e alho curam covid 19:
https://politica.estadao.com.br/blogs/estadao-verifica/receita-caseira-com-jambu-alho-e-limao-nao-cura-a-covid-19/
Apesar do excelente trabalho feito por essas agências, o acesso ao seu conteúdo e o conhecimento da sua existência ainda não chegam ao público comum. Tendo isso em
vista, João foi concebido como ferramenta para ajudar usuários comuns a consolidar suas opiniões, baseando-se em evidências reunidas pelo aplicativo.


## Versão 0.0 
No ponto atual do desenvolvimento, contamos com uma versão inicial da aplicação que basicamente verifica se uma determinada frase foi citada em algum dos diversos
bancos de dados de agências checadoras de fatos. Pensando também em fazer um projeto com caráter incremental, iniciamos apenas com notícias relacionadas ao COVID-19, mas
vemos como objetivo futuro uma abertura para buscas sobre outros temas. Além disso, outras funcionalidades poderão vir a ser adicionadas em outras versões. Algumas ideias
são: análise de imagens, análise de domínio ao receber um link, entre outras. 

O primeiro contato com a ferramenta deve partir do usuário, que envia uma mensagem a fim de se cadastrar no serviço.

![join_msg jpeg](https://user-images.githubusercontent.com/17649711/86497661-e1b92380-bd58-11ea-8575-7c29584e9d62.jpg)

A partir desse momento, a interação deve partir outra vez de quem está utilizando. O único tipo de dado aceito atualmente é texto, qualquer outro tipo não será processado. Ao
enviar um texto, uma busca é feita e retorna respostas com links para as verificaçõesencontradas no banco de dados.

![hit_msg jpeg](https://user-images.githubusercontent.com/17649711/86497675-ed0c4f00-bd58-11ea-834b-9b638126a7f0.jpg)

Caso não encontre nenhuma verificação relacionada ao texto enviado, uma reformulação na entrada do usuário é sugerida.

![nohit_msg jpeg](https://user-images.githubusercontent.com/17649711/86497601-b7676600-bd58-11ea-82db-408fe57b630e.jpg)

Em casos de erro, em que a plataforma encontrou algum problema para processar o pedido do usuário, envia-se uma mensagem evidenciando o problema.

![erro_msg jpeg](https://user-images.githubusercontent.com/17649711/86497465-2b553e80-bd58-11ea-960f-c6413639cf04.jpg)

Para retirar-se do serviço, o usuário basicamente deve enviar uma mensagem de stop e será descadastrado. A partir desse momento, as requisições já não são processadas

![stop_msg jpeg](https://user-images.githubusercontent.com/17649711/86497630-ce0dbd00-bd58-11ea-85d2-bcb9d56a4c97.jpg)

## Porque confiar em nossas fontes?

As checagens utilizadas pela ferramenta são feitas por agências checadoras de fatos participantes da aliança contra a infodemia a respeito do novo Coronavírus encabeçada pela Poynter ( https://www.poynter.org/coronavirusfactsalliance/ ). A aliança disponibiliza um banco de dados com notícias checadas por agências de diversos países, além de fazer uma análise dos dados e publicá-los em forma de gráficos. Algumas das agências brasileiras participantes da aliança são:

● Aos Fatos: https://www.aosfatos.org/

● Agência Lupa: https://piaui.folha.uol.com.br/lupa/

● Estadão Verifica: https://politica.estadao.com.br/blogs/estadao-verifica/

Além das fontes citadas, há fontes de outros países também, como agênciasverificadoras argentinas, espanholas e de outras nacionalidades. As múltiplas fontes presentes na aliança lhe concedem uma pluralidade de opiniões importante ao combater o problema das FakeNews. Sendo assim, João utiliza das diversas checagens com o objetivo
de combater a desinformação e aproximar o público geral do conteúdo desmistificante produzido por essas organizações.

