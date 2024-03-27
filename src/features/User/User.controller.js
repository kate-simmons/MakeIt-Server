import UserRepository from "./User.repository.js";
import Razorpay from "razorpay";
import crypto from "crypto";
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

  //code to add order
  async OrderCreate(req, res) {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    console.log("inside order create");
    try {
      const { amount } = req.body;
      // console.log(orders);
      // const order = await razorpay.orders.create(options);
      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt#1",
      });
      if (!order) {
        res.status(500).send("Error");
      } else {
        res.status(200).json(order);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  //code to validate order
  OrderValidate(req, res) {
    console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).send("Payment is invalid");
    } else {
      return res.json({ msg: "Payment success" });
    }
  }
}

export default UserController;
