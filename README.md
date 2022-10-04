# :movie_camera: Rocketmovies Backend

Esse projeto é uma aplicação para guardar, mostrar, editar e deletar filmes em um banco de dados.

<h1 align="center">
    <img src="./src/assets/images/node.jpg" alt="Capa do projeto">
</h1>

## :open_book: Sumário

- [Pré-Visualização](#clapper-pré-visualização)
- [Aviso](#loudspeaker-aviso)
- [Sobre](#memo-sobre)
- [Tecnologias](#floppy_disk-tecnologias)
- [Funcionalidades](#hammer-funcionalidades)
- [Utilização](#bulb-utilização)
- [Autor](#nerd_face-autor)

</br>

## :clapper: Pré-Visualização

<h1 align="center">
    <img src="./src/assets/images/preview.gif" alt="gif da versão desktop">
</h1>

</br>

## :loudspeaker: Aviso

- A primeira versão do projeto **está finalizada**.

- Você pode testar o projeto utilizando o front-end [clicando aqui!](https://rocketmovies2022.netlify.app/), ou então você pode clonar o repositorio e testar localmente utilizando o NodeJS e o Insomnia.

- Você pode baixar o NodeJS [clicando aqui](https://nodejs.org/pt-br/download/).

- Você pode baixar o Insomnia [clicando aqui](https://insomnia.rest/download).

- A modelagem do banco de dados foi feita por um autor desconhecido.

</br>

## :memo: Sobre

Este é um dos projetos propostos no programa [Explorer da Rocketseat](https://www.rocketseat.com.br/explorer), os [detalhes estão aqui](https://efficient-sloth-d85.notion.site/Aplica-o-em-Node-57bd49ae77b3422fad74f8dde0d06fef), mas basicamente é uma aplicação que guarda, mostra, edita e apaga(CRUD) informações de um filme (enviadas pelo usuário) em um Banco de Dados Relacional.

Abaixo, temos o diagrama usado como base:

<h1 align="center">
    <img src="./src/assets/images/diagrama.jpg" alt="gif da versão desktop">
</h1>

</br>

## :floppy_disk: Tecnologias

- **JS** - usado para fazer toda a lógica da aplicação;
- **NodeJs** - utilizado para executar o JS fora do navegador;
- **Express** - responsável por lidar com as requisições HTTP;
- **Sqlite** - usado para guardar os registros;
- **Knex** - utilizado para gerar comandos SQL;
- **Multe** - usado para gerenciar o upload de imagens.
- **Git** - responsável por realizar o versionamento do código.

</br>

## :hammer: Funcionalidades

- [x] Cadastrar um usuário;
- [x] Atualizar e-mail, senha, avatar ou nome de um usuário.
- [x] Cadastrar uma anotação de um filme;
- [x] Mostrar a anotação de um filme especifico;
- [x] Apagar uma anotação;
- [x] Atualizar a anotação de um filme;
- [x] Mostrar várias anotações (filtrados por título);

</br>

## :bulb: Utilização

- [Iniciando a aplicação](#iniciando-a-aplicação)
- [Usando os recursos](#usando-os-recursos)
  - [Seções](#seções)
    - [Criar](#criar-uma-seção)
  - [Usuários](#usuários)
    - [Criar](#criar-um-usuário)
    - [Atualizar](#atualizar-um-usuário)
    - [Atualizar o Avatar](#atualizar-o-avatar-de-um-usuário)
  - [Notas](#notas)
    - [Criar](#criar-uma-nota)
    - [Atualizar](#atualizar-uma-nota)
    - [Excluir](#excluir-uma-nota)
    - [Mostrar Especifica](#mostrar-uma-nota)
    - [Mostrar Várias](#mostrar-várias-notas)
  - [Arquivos](#arquivos)
    - [Mostrar](#mostrar-um-arquivo)

---

### _Iniciando a aplicação_

Para iniciar a aplicação, é necessário:

- Baixar ou clonar o repositório em sua maquina.
- Abrir o diretório aonde ele esta salvo.
- Abrir o terminal nesse diretório.
- Executar o seguinte comando:
  ```bash
      $ npm start
  ```
- Se tudo der certo, a seguinte mensagem vai aparecer no terminal/console:
  ```
      Server is running on port 3333.
  ```
- Com isso, todas as dependências devem ser instaladas, e um servidor local ficará em execução na porta 3333.

- Para utilizar todo dos recursos desta API, vamos utilizar a seguinte URL base:

  `http://localhost:3333`

- E para fazer as requisições usaremos o Insomnia.

---

### _Usando os recursos_

- #### **SEÇÕES**

  - ##### **Criar uma Seção**

    Para todas as requisições (exceto para: "Criar um usuário", "Criar uma seção" e "Mostrar arquivos"), a aplicação espera um Bearer token (JWT) no header da requisição, ou seja, espera que o usuário esteja autenticado. Para gerar esse token, basta fazer uma requisição na URL:

    `http://localhost:3333/sessions`

    A requisição terá que ser feita com o método `POST`, utilizando JSON com o seguinte padrão:

    ```JSON
        {
            "email": "seu@email.com",
            "password": "suaSenha123"
        }
    ```

    Se tudo der certo, você deverá receber a seguinte resposta:

    ```JSON
        {
        "user": {
            "name": "Usuário",
            "email": "usuario@email.com",
            "avatar": "cdcdd64d04f5a7a79897-sua-foto.jpeg"
        },
        "token": "eyJhbGciOiJIUsfdsNiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjQ4MjY4OTcsImV4cCI6MTY2NDkxMzI5Nywic3ViIjoiMiJ9.oQuO0mxo7AsfdsfvsxUQC6-JjbFFADfCe9bY7Kjg"
        }
    ```

- #### **USUÁRIOS**

  - ##### **Criar um Usuário**

    Para criar um usuário nós usaremos o recurso "users", a URL ficará assim:

    `http://localhost:3333/users`

    A requisição terá que ser feita com o método `POST`, utilizando JSON com o seguinte padrão:

    ```JSON
        {
            "name": "Seu nome",
            "email": "seu@email.com",
            "password": "suaSenha123"
        }
    ```

    Se tudo der certo, você deverá receber a seguinte resposta:

    ```JSON
        {
            "status": 201,
            "message": "O usuário foi cadastrado com sucesso!"
        }
    ```

  - ##### **Atualizar um Usuário**

    Para atualizar um usuário nós usaremos o recurso "users". A URL ficará assim:

    `http://localhost:3333/users/`

    _OBS: para realizar esse requisição o usuário precisa estar autenticado._

    A requisição terá que ser feita com o método `PUT`, utilizando JSON com o seguinte padrão:

    ```JSON
        {
            "new_name": "Nome Atualizado",
            "new_email": "novo@email.com",
            "new_password": "123",
            "current_password": "123"
        }
    ```

    **ATENÇÃO**: apenas as informações que forem enviadas serão atualizadas.

    Se tudo der certo, você deverá receber a seguinte resposta:

    ```JSON
        {
            "status": 201,
            "message": "O dados foram atualizados com sucesso!"
        }
    ```

  - ##### **Atualizar o Avatar de um Usuário**

  Para atualizar o avatar de um usuário, usaremos o mesmo recurso anterior, mas com o acréscimo de "/avatar". A URL ficará assim:

  `http://localhost:3333/users/avatar`

  Para realizar essa requisição, é necessário que a foto será enviada através de um formulário, dentro de um campo chamado "avatar".

  _OBS: para realizar esse requisição o usuário precisa estar autenticado._

  Se tudo der certo, você receberá uma resposta como essa:

  ```JSON
  	{
  		"user": {
  			"name": "Gustavo Silva",
  			"email": "gustavo@email.com",
  			"avatar": "06006b2e1f2369b66572-foto de perfil-editada.jpg"
  		}
  	}

  ```

- #### **NOTAS**

  - ##### **Criar uma Nota**

    Para criar uma nota nós usaremos o recurso "notes". A URL ficará assim:

    `http://localhost:3333/notes/`

    _OBS: para realizar esse requisição o usuário precisa estar autenticado._

    A requisição terá que ser feita com o método `POST`, utilizando JSON com o seguinte padrão:

    ```JSON
        {
            "title": "Filme 1",
            "description": "A descrição do filme aqui.",
            "rating": 10,
            "tags": ["Ação", "Aventura", "Romance"]
        }
    ```

    Se tudo der certo, você deverá receber a seguinte resposta:

    ```JSON
        {
            "status": 201,
            "message": "A nota foi cadastrada com sucesso."
        }
    ```

  - ##### **Atualizar uma Nota**

    Para atualizar uma nota nós usaremos o recurso "notes", junto com o id da nota que será atualizada. A URL ficará assim:

    `http://localhost:3333/notes/1`

    _OBS: `1` é o numero do id da nota que será atualizada._
    _OBS: para realizar esse requisição o usuário precisa estar autenticado._

    A requisição terá que ser feita com o método `PUT`, utilizando JSON com o seguinte padrão:

    ```JSON
        {
            "title": "Filme 1",
            "description": "A descrição do filme aqui.",
            "rating": 10,
            "tags": ["Ação", "Aventura", "Romance"]
        }
    ```

    **ATENÇÃO**: apenas as informações que forem enviadas serão atualizadas.

    Se tudo der certo, você deverá receber a seguinte resposta:

    ```JSON
        {
            "status": 201,
            "message": "A nota foi atualizada com sucesso."
        }
    ```

  - ##### **Excluir uma Nota**

    Para excluir uma nota nós usaremos o recurso "notes", junto com o id da nota que será excluída. A URL ficará assim:

    `http://localhost:3333/notes/1`

    _OBS: `1` é o numero do id da nota que será excluída._
    _OBS: para realizar esse requisição o usuário precisa estar autenticado._

    A requisição terá que ser feita com o método `DELETE`.

    Se tudo der certo, você deverá receber a seguinte resposta:

    ```JSON
        {
            "status": 201,
            "message": "A nota foi deletada com sucesso."
        }
    ```

  - ##### **Mostrar uma Nota**

    Para mostrar as informações de uma nota nós usaremos o recurso "notes", junto com o id da nota que será exibida. A URL ficará assim:

    `http://localhost:3333/notes/1`

    _OBS: `1` é o numero do id da nota que será exibida._
    _OBS: para realizar esse requisição o usuário precisa estar autenticado._

    A requisição terá que ser feita com o método `GET`.

    Se tudo der certo, você deverá receber a seguinte resposta:

    ```JSON
        {
            "id": 1,
            "title": "Filme 1",
            "description": "Descrição do filme.",
            "rating": 10,
            "user_id": 1,
            "created_at": "2022-08-11 14:58:01",
            "updated_at": "2022-08-11 14:59:48",
            "tags": [
                {
                    "id": 1,
                    "note_id": 1,
                    "user_id": 1,
                    "name": "Ação"
                },
                {
                    "id": 2,
                    "note_id": 1,
                    "user_id": 1,
                    "name": "Aventura"
                },
                {
                    "id": 3,
                    "note_id": 1,
                    "user_id": 1,
                    "name": "Romance"
                }
            ]
        }
    ```

  - ##### **Mostrar várias Notas**

    Para mostrar todas as notas de um usuário e com a possibilidade de colocar um filtro, nós usaremos o recurso "notes".

    Dessa vez os parâmetros terão que ser enviados por Query (query params).

    Nós teremos o seguinte parâmetro:

    - `title` : será usado para buscar as notas que contenham esse titulo;

    _OBS: para realizar esse requisição o usuário precisa estar autenticado._

    A URL ficará assim:

    `http://localhost:3333/notes/?title=nome`

    A requisição terá que ser feita com o método `GET`.

    Se tudo der certo, você deverá receber a seguinte resposta:

    ```JSON
    	[
    			{
    					"id": 9,
    					"title": "Homem Aranha",
    					"description": "Um filme de heróis",
    					"rating": 5,
    					"user_id": 3,
    					"created_at": "2022-09-29 11:29:25",
    					"updated_at": "2022-09-29 11:29:25"
    			},
    			{
    					"id": 10,
    					"title": "Vingadores",
    					"description": "Outro filme",
    					"rating": 5,
    					"user_id": 3,
    					"created_at": "2022-09-29 11:39:17",
    					"updated_at": "2022-09-29 11:39:17"
    			}
    	]
    ```

- #### **ARQUIVOS**

  - ##### **Mostrar um arquivo**

  Para receber um arquivo/foto como a resposta de uma requisição, não é necessário estar autenticado, mas é obrigatório saber o nome exato do arquivo (avatar/foto), que será mostrado.
  _OBS: o nome aparece em algumas requisições._

  Para isso, A requisição terá que ser feita com o método `GET` no recurso `/files`. A URL ficará assim:

  `http://localhost:3333/files/nome-da-foto.png`

  Se tudo ser certo, a foto será recebida como resposta.

---

_Esses são os recursos disponíveis nessa Aplicação, se algum recurso não funcionar como o esperado, verifique essa documentação e tente novamente._

_Caso persista, por favor,entre em contato com [devgustavosantos@outlook.com](mailto:devgustavosantos@outlook.com)._

## :nerd_face: Autor

Feito com :heart: por Dev Gustavo Santos :grinning: Veja meu [LinkedIn.](https://www.linkedin.com/in/devgustavosantos/)
