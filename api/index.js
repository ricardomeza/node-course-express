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
const port = process.env.PORT || 3005;

app.use(express.json());

const corsWhiteList = [
  'http://localhost:8005',
  'https://node-course-express.vercel.app',
];
const options = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    if (corsWhiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not permited'));
    }
  },
};
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Personal API Project');
});

app.get('/api/new', (req, res) => {
  res.send('New route!');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server is running on port: ', port);
});
