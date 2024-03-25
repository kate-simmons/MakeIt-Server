import UserRepository from "./User.repository.js";

class UserController {
  constructor() {
    this.repository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const response = await this.repository.signup(name, email, password);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const response = await this.repository.signin(email, password);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async signOut(req, res) {
    try {
      const response = await this.repository.signout();
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getUserData(req, res) {
    try {
      const id = req.params.id;
      const response = await this.repository.getUserData(id);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async placeOrder(req, res) {
    try {
      const response = await this.repository.placeOrder(req.body);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async addToCart(req, res) {
    try {
      const response = await this.repository.addToCart(req.body);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async removeFromCart(req, res) {
    try {
      const response = await this.repository.removeFromCart(req.body);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async increaseQty(req, res) {
    try {
      const response = await this.repository.increaseQty(req.body);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async decreaseQty(req, res) {
    try {
      const response = await this.repository.decreaseQty(req.body);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async emptyCart(req, res) {
    try {
      const response = await this.repository.emptyCart(req.body.id);

      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

export default UserController;
