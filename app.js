const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { limiter } = require('./limiter/rate-limit');
const { SERVER_PORT, DB } = require('./configs/config');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}, () => console.log(`DB was connected with url ${DB}`));

app.use(limiter);
app.use(requestLogger);
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(SERVER_PORT, () => console.log(`Server was connected to port ${SERVER_PORT}`));
