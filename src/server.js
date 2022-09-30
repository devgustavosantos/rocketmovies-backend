require("express-async-errors");
require("dotenv/config");
const express = require("express");
const cors = require("cors");

const AppError = require("./utils/AppError");
const routes = require("./routes");
const uploadConfigs = require("./configs/upload");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/files", express.static(uploadConfigs.UPLOAD_FOLDER));

app.use(routes);

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

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
