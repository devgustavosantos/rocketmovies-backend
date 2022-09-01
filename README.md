# :movie_camera: Rocketmovies Backend

Esse projeto é uma aplicação para guardar, mostrar, editar e deletar filmes em um banco de dados.

<h1 align="center">
    <img src="./src/assets/images/node.jpg" alt="Capa do projeto">
</h1>

## :open_book: Sumário

-   [Pré-Visualização](#clapper-pré-visualização)
-   [Aviso](#loudspeaker-aviso)
-   [Sobre](#memo-sobre)
-   [Tecnologias](#floppy_disk-tecnologias)
-   [Funcionalidades](#hammer-funcionalidades)
-   [Utilização](#bulb-utilização)
-   [Autor](#nerd_face-autor)

</br>

## :clapper: Pré-Visualização

<h1 align="center">
    <img src="./src/assets/images/preview.gif" alt="gif da versão desktop">
</h1>

</br>

## :loudspeaker: Aviso

-   A primeira versão do projeto **está finalizada**.

-   Para testar a aplicação, é necessário ter o NodeJS e o Insomnia (ou equivalente) instalados na máquina.;

-   Você pode baixar o NodeJS [clicando aqui](https://nodejs.org/pt-br/download/).

-   Você pode baixar o Insomnia [clicando aqui](https://insomnia.rest/download).

-   A modelagem do banco de dados foi feita por um autor desconhecido.

</br>

## :memo: Sobre

Este é um dos projetos propostos no programa [Explorer da Rocketseat](https://www.rocketseat.com.br/explorer), os [detalhes estão aqui](https://efficient-sloth-d85.notion.site/Aplica-o-em-Node-57bd49ae77b3422fad74f8dde0d06fef), mas basicamente é uma aplicação que guarda, mostra, edita e apaga(CRUD) informações de um filme (enviadas pelo usuário) em um Banco de Dados Relacional.

Abaixo, temos o diagrama usado como base:

<h1 align="center">
    <img src="./src/assets/images/diagrama.jpg" alt="gif da versão desktop">
</h1>

</br>

## :floppy_disk: Tecnologias

-   **JS** - usado para fazer toda a lógica da aplicação;
-   **NodeJs** - utilizado para executar o JS fora do navegador;
-   **Express** - responsável por lidar com as requisições HTTP;
-   **Sqlite** - usado para guardar os registros;
-   **Knex** - utilizado para gerar comandos SQL;
-   **Git** - responsável por realizar o versionamento do código.

</br>

## :hammer: Funcionalidades

-   [x] Cadastrar um usuário;
-   [x] Atualizar e-mail, senha ou nome de um usuário.
-   [x] Apagar um usuário.
-   [x] Cadastrar uma anotação de um filme;
-   [x] Mostrar a anotação de um filme especifico;
-   [x] Apagar um anotação;
-   [x] Atualizar as anotações de um filme;
-   [x] Mostrar várias anotações (filtrados por título, classificação e tag);
-   [x] Mostrar todas as tags usadas;
-   [x] Mostrar informações de uma tag especifica;
-   [x] Excluir uma tag;
-   [x] Atualizar o nome de uma tag.

</br>

## :bulb: Utilização

-   [Iniciando a aplicação](#iniciando-a-aplicação)
-   [Usando os recursos](#usando-os-recursos)
    -   [Usuários](#usuários)
        -   [Criar](#criar-um-usuário)
        -   [Atualizar](#atualizar-um-usuário)
        -   [Excluir](#excluir-um-usuário)
        -   [Mostrar Especifico](#mostrar-um-usuário)
        -   [Mostrar Todos](#mostrar-todos-usuários)
    -   [Notas](#notas)
        -   [Criar](#criar-uma-nota)
        -   [Atualizar](#atualizar-uma-nota)
        -   [Excluir](#excluir-uma-nota)
        -   [Mostrar Especifica](#mostrar-uma-nota)
        -   [Mostrar Várias](#mostrar-várias-notas)
    -   [Tags](#tags)
        -   [Atualizar](#atualizar-uma-tag)
        -   [Excluir](#excluir-uma-tag)
        -   [Mostrar Especifica](#mostrar-uma-tag)
        -   [Mostrar Todas](#mostrar-todas-tags)

---

### _Iniciando a aplicação_

Para iniciar a aplicação, é necessário:

-   Baixar ou clonar o repositório em sua maquina.
-   Abrir o diretório aonde ele esta salvo.
-   Abrir o terminal nesse diretório.
-   Executar o seguinte comando:
    ```bash
        $ npm start
    ```
-   Se tudo der certo, a seguinte mensagem vai aparecer no terminal/console:
    ```
        Server is running on port 3333.
    ```
-   Com isso, todas as dependências devem ser instaladas, o arquivo com o banco de dados será criado, e um servidor local ficará em execução na porta 3333.

-   Para utilizar todo dos recursos desta API, vamos utilizar a seguinte URL base:

    `http://localhost:3333`

-   E para fazer as requisições usaremos o Insomnia.

---

### _Usando os recursos_

-   #### **USUÁRIOS**

    -   ##### **Criar um Usuário**

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

    -   ##### **Atualizar um Usuário**

        Para atualizar um usuário nós usaremos o recurso "users", junto com o id do usuário que será atualizado. A URL ficará assim:

        `http://localhost:3333/users/1`

        _OBS: `1` é o numero do id do usuário que será atualizado._

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

    -   ##### **Excluir um Usuário**

        Para excluir um usuário nós usaremos o recurso "users", junto com o id do usuário que será excluído. A URL ficará assim:

        `http://localhost:3333/users/1`

        _OBS: `1` é o numero do id do usuário que será excluído._

        A requisição terá que ser feita com o método `DELETE`.

        Se tudo der certo, você deverá receber a seguinte resposta:

        ```JSON
            {
                "status": 201,
                "message": "O usuário foi excluído com sucesso."
            }
        ```

    -   ##### **Mostrar um Usuário**

        Para mostrar um usuário nós usaremos o recurso "users", junto com o id do usuário que será exibido. A URL ficará assim:

        `http://localhost:3333/users/1`

        _OBS: `1` é o numero do id do usuário que será exibido._

        A requisição terá que ser feita com o método `GET`.

        Se tudo der certo, você deverá receber a seguinte resposta:

        ```JSON
            {
                "id": 15,
                "name": "Nome do Usuário",
                "email": "usuario@email.comm",
                "password": "$2a$08$rps70F6hBt3u2JoeJSFQqe4KT9ipf/jh9FPU5Ody13g8fEcge5j8C",
                "avatar": null,
                "created_at": "2022-08-11 14:10:42",
                "updated_at": "2022-08-11 14:12:41"
            }
        ```

    -   ##### **Mostrar todos Usuários**

        Para mostrar todos os usuário nós usaremos o recurso "users" . A URL ficará assim:

        `http://localhost:3333/users/`

        A requisição terá que ser feita com o método `GET`.

        Se tudo der certo, você deverá receber a seguinte resposta:

        ```JSON
            [
                {
                    "id": 1,
                    "name": "Nome do Usuário 1",
                    "email": "usuario10@email.comm",
                    "password": "$2a$08$hSxSbmALQN6sL9CY0Xok4u6Qqdp/xP/9NXGBtjpg7Pm.ljGgpAaX6",
                    "avatar": null,
                    "created_at": "2022-08-10 18:42:38",
                    "updated_at": "2022-08-11 14:10:01"
                },
                {
                    "id": 2,
                    "name": "Nome do Usuário 2",
                    "email": "usuario2@email.com",
                    "password": "$2a$08$n31FWj4lH2ary/yYfCytQOGk.RR/X5J1x6n0ALGfWkkvg8Xc4PXxG",
                    "avatar": null,
                    "created_at": "2022-08-11 13:37:34",
                    "updated_at": "2022-08-11 13:37:34"
                },
                {
                    "id": 3,
                    "name": "Nome do Usuário 3",
                    "email": "usuario3@email.com",
                    "password": "$2a$08$cg1hY1GMK.QSgQMPh94doeH2yWt2ObFvi9W976VneMnyJ4UmZtKsC",
                    "avatar": null,
                    "created_at": "2022-08-11 13:46:05",
                    "updated_at": "2022-08-11 13:46:05"
                }
            ]
        ```

---

-   #### **NOTAS**

    -   ##### **Criar uma Nota**

        Para criar uma nota nós usaremos o recurso "notes", passando o id do aa URL ficará assim:

        `http://localhost:3333/notes/1`

        _OBS: `1` é o numero do id do usuário que será atualizado._

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

    -   ##### **Atualizar uma Nota**

        Para atualizar uma nota nós usaremos o recurso "notes", junto com o id da nota que será atualizada. A URL ficará assim:

        `http://localhost:3333/notes/1`

        _OBS: `1` é o numero do id da nota que será atualizada._

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

    -   ##### **Excluir uma Nota**

        Para excluir uma nota nós usaremos o recurso "notes", junto com o id da nota que será excluída. A URL ficará assim:

        `http://localhost:3333/notes/1`

        _OBS: `1` é o numero do id da nota que será excluída._

        A requisição terá que ser feita com o método `DELETE`.

        Se tudo der certo, você deverá receber a seguinte resposta:

        ```JSON
            {
                "status": 201,
                "message": "A nota foi deletada com sucesso."
            }
        ```

    -   ##### **Mostrar uma Nota**

        Para mostrar as informações de uma nota nós usaremos o recurso "notes", junto com o id da nota que será exibida. A URL ficará assim:

        `http://localhost:3333/notes/1`

        _OBS: `1` é o numero do id da nota que será exibida._

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

    -   ##### **Mostrar várias Notas**

        Para mostrar todas as notas de um usuário e com a possibilidade de colocar filtros, nós usaremos o recurso "notes".

        Dessa vez os parâmetros terão que ser enviados por Query (query params).

        Nós teremos os seguintes parâmetros:

        -   `user_id` : **obrigatório** pois será usado para encontrar as notas daquele usuário.

        -   `title` : será usada para buscar as notas que contenham esse titulo;

        -   `rating` : será usada para buscar as notas que contenham apenas aquela nota.

        -   `tags`: será usada para buscar as notas que contenham apenas aquelas tags, respeitando letrar maiúsculas e minusculas.

        Os filtros podem ser usados juntos ou separados, mas é **OBRIGATÓRIO** o envio do `user_id`.

        A URL ficará assim:

        `http://localhost:3333/notes/?title=nome&rating=8&tags=romance&user_id=16`

        A requisição terá que ser feita com o método `GET`.

        Se tudo der certo, você deverá receber a seguinte resposta:

        ```JSON
            [
                {
                    "id": 1,
                    "name": "Nome do Usuário 1",
                    "email": "usuario10@email.comm",
                    "password": "$2a$08$hSxSbmALQN6sL9CY0Xok4u6Qqdp/xP/9NXGBtjpg7Pm.ljGgpAaX6",
                    "avatar": null,
                    "created_at": "2022-08-10 18:42:38",
                    "updated_at": "2022-08-11 14:10:01"
                },
                {
                    "id": 2,
                    "name": "Nome do Usuário 2",
                    "email": "usuario2@email.com",
                    "password": "$2a$08$n31FWj4lH2ary/yYfCytQOGk.RR/X5J1x6n0ALGfWkkvg8Xc4PXxG",
                    "avatar": null,
                    "created_at": "2022-08-11 13:37:34",
                    "updated_at": "2022-08-11 13:37:34"
                },
                {
                    "id": 3,
                    "name": "Nome do Usuário 3",
                    "email": "usuario3@email.com",
                    "password": "$2a$08$cg1hY1GMK.QSgQMPh94doeH2yWt2ObFvi9W976VneMnyJ4UmZtKsC",
                    "avatar": null,
                    "created_at": "2022-08-11 13:46:05",
                    "updated_at": "2022-08-11 13:46:05"
                }
            ]
        ```

---

-   #### **TAGS**

    -   ##### **Atualizar uma Tag**

        Para atualizar uma tag nós usaremos o recurso "tags/specific", e para esse recurso também será necessário o envio dos parâmetros através de query (Query Params).

        Estes serão os parâmetros:

        -   `id` : será usada para buscar as tag que será atualizada.

        -   `name` : será o novo nome da tag.

        A URL ficará assim:

        `http://localhost:3333/tags/specific/?id=10&name=vingadores`

        A requisição terá que ser feita com o método `PUT`.

        Se tudo der certo, você deverá receber a seguinte resposta:

        ```JSON
            {
                "status": 201,
                "message": "A tag foi atualizada com sucesso."
            }
        ```

    -   ##### **Excluir uma Tag**

        Para excluir uma tag nós usaremos o recurso "tags/specific", junto com o id da tag que será excluída. A URL ficará assim:

        `http://localhost:3333/tag/specific/1`

        _OBS: `1` é o numero do id da tag que será excluída._

        A requisição terá que ser feita com o método `DELETE`.

        Se tudo der certo, você deverá receber a seguinte resposta:

        ```JSON
            {
                "status": 201,
                "message": "A tag foi excluída com sucesso."
            }
        ```

    -   ##### **Mostrar uma Tag**

        Para mostrar as informações de uma tag nós usaremos o recurso "tags/specific", junto com o id da tag que será exibida. A URL ficará assim:

        `http://localhost:3333/tags/specific/1`

        _OBS: `1` é o numero do id da tag que será exibida._

        A requisição terá que ser feita com o método `GET`.

        Se tudo der certo, você deverá receber a seguinte resposta:

        ```JSON
                {
                    "id": 121,
                    "note_id": 33,
                    "user_id": 15,
                    "name": "Ação"
                }
        ```

    -   ##### **Mostrar todas Tags**

        Para mostrar todas tags nós usaremos o recurso "tags", junto ao id do usuário ao qual elas pertencem . A URL ficará assim:

        `http://localhost:3333/tags/1`

        _OBS: `1` é o numero do id do usuário que é dono dessas tags._

        A requisição terá que ser feita com o método `GET`.

        Se tudo der certo, você deverá receber a seguinte resposta:

        ```JSON
            {
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
            }
        ```

---

_Esses são os recursos disponíveis nessa Aplicação, se algum recurso não funcionar como o esperado, verifique essa documentação e tente novamente, mas caso precista, por favor mande um e-mail para [devgustavosantos@outlook.com](mailto:devgustavosantos@outlook.com)._

## :nerd_face: Autor

Feito com :heart: por Dev Gustavo Santos :grinning: Veja meu [LinkedIn.](https://www.linkedin.com/in/devgustavosantos/)
