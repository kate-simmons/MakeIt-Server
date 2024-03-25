import { ProductRepository } from "./Product.repository.js";

class ProductController {
  constructor() {
    this.repository = new ProductRepository();
  }

  async getBreakfast(req, res) {
    try {
      const response = await this.repository.getAllBreakfast();
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  async getDinner(req, res) {
    try {
      const response = await this.repository.getAllDinner();
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
  async getLunch(req, res) {
    try {
      const response = await this.repository.getAllLunch();
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
  async getSnacks(req, res) {
    try {
      const response = await this.repository.getAllSnacks();
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
}

export default ProductController;
