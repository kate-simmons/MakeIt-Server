import express from "express";
import ProductController from "./Product.controller.js";
const productRouter = express.Router();

const productcontrol = new ProductController();
productRouter.get("/breakfast", (req, res) => {
  productcontrol.getBreakfast(req, res);
});

productRouter.get("/dinner", (req, res) => {
  productcontrol.getDinner(req, res);
});

productRouter.get("/lunch", (req, res) => {
  productcontrol.getLunch(req, res);
});

productRouter.get("/snacks", (req, res) => {
  productcontrol.getSnacks(req, res);
});

export default productRouter;
