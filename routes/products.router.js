const express = require('express');
const ProudctsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProudctsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/filters', (req, res) => {
  res.send('Filters route');
});

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const product = await service.create(body);
    res.status(201).json(product);
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const product = await service.delete(id);
    res.json(product);
  },
);

module.exports = router;
