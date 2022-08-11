# :movie_camera: Aplicação Node

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
    <img src="./src/assets/images/place-holder.jpg" alt="gif da versão desktop">
</h1>

</br>

## :loudspeaker: Aviso

-   O projeto **está em andamento**, por isso é normal que bugs aconteçam.

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
    -   [Usuários](#iniciando-a-aplicação)
        -   [Criar](#criar-um-usuário)
        -   [Atualizar](#atualizar-um-usuário)
        -   [Excluir]()
        -   [Mostrar Especifico]()
        -   [Mostrar Todos]()
    -   [Notas]()
        -   [Criar]()
        -   [Atualizar]()
        -   [Mostrar Especifica]()
        -   [Mostrar Todas]()
    -   [Tags]()
        -   [Criar]()
        -   [Atualizar]()
        -   [Mostrar Especifica]()
        -   [Mostrar Todas]()

---

### _Iniciando a aplicação_

Para iniciar a aplicação, é necessário:

-   Abrir o diretório aonde ela esta salva.
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

    `localhost:3333`

---

### _Usando os recursos_

-   #### **USUÁRIOS**

    -   ##### **Criar um Usuário**

        Para criar um usuário nós usaremos o recurso "users", a URL ficará assim:

        `localhost:3333/users`

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

        `localhost:3333/users/1`

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

        `localhost:3333/users/1`

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

        `localhost:3333/users/1`

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

        `localhost:3333/users/`

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

```
**Em breve**

```

## :nerd_face: Autor

Feito com :heart: por Dev Gustavo Santos :grinning: Veja meu [LinkedIn.](https://www.linkedin.com/in/devgustavosantos/)
