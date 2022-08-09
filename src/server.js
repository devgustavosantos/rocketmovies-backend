require("express-async-errors");

const AppError = require("./utils/AppError");

const express = require("express");

const routes = require("./routes");

const app = express();

app.use(express.json());

app.use("/", routes);

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    }

    console.log(error);

    return response.status(500).json({
        status: 500,
        message: "Erro interno, por favor contate o administrador!",
    });
});

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
