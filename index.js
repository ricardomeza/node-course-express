const cors = require('cors');
const express = require('express');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const {} = require('./schemas/product.schema');

const app = express();
const port = 3005;

app.use(express.json());

const corsWhiteList = ['http://localhost:8005'];
const options = {
  origin: (origin, callback) => {
    if (corsWhiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not permited'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/new', (req, res) => {
  res.send('New route!');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server is running on port: ', port);
});
