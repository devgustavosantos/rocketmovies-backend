require("express-async-errors");

const AppError = require("./utils/AppError");

const express = require("express");

const routes = require("./routes");
const { json } = require("body-parser");

const app = express();

app.use(express.json());

app.use("/", routes);

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.json({
            status: error.statusCode,
            message: error.message,
        });
    }

    console.log(error);

    return response.json({
        status: 500,
        message: "Erro interno, por favor contate o administrador!",
    });
});

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
