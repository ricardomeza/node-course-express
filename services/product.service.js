const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProudctsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const id = faker.string.uuid();
    this.products.push({
      id,
      ...data,
    });
    return { id, ...data };
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    });
  }

  async findOne(id) {
    const item = this.products.find((item) => item.id === id);
    if (!item) {
      throw boom.notFound('Product not found');
    }
    if (item.isBlock) {
      throw boom.conflict('The products is block');
    }
    return item;
  }

  async update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = { ...product, ...data };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new boom.notFound('Product not found');
    } else {
      this.products.splice(index, 1);
      return { message: 'Product deleted successfully', id };
    }
  }
}

module.exports = ProudctsService;
