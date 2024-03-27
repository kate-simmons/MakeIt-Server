import express from "express";
import UserController from "./User.controller.js";
const userRouter = express.Router();

const usercontrol = new UserController();

userRouter.post("/signup", (req, res) => {
  usercontrol.signUp(req, res);
});

userRouter.post("/signin", (req, res) => {
  usercontrol.signIn(req, res);
});

userRouter.post("/signout", (req, res) => {
  usercontrol.signOut(req, res);
});

userRouter.get("/getUserData/:id", (req, res) => {
  usercontrol.getUserData(req, res);
});

// ****************
userRouter.post("/placeOrder", (req, res) => {
  usercontrol.placeOrder(req, res);
});
userRouter.post("/addToCart", (req, res) => {
  usercontrol.addToCart(req, res);
});
userRouter.post("/removeFromCart", (req, res) => {
  usercontrol.removeFromCart(req, res);
});
userRouter.post("/increaseQty", (req, res) => {
  usercontrol.increaseQty(req, res);
});

userRouter.post("/decreaseQty", (req, res) => {
  usercontrol.decreaseQty(req, res);
});

userRouter.post("/emptyCart", (req, res) => {
  usercontrol.emptyCart(req, res);
});

userRouter.post("/orders", (req, res) => {
  usercontrol.OrderCreate(req, res);
});

userRouter.post("/order/validate", (req, res) => {
  usercontrol.OrderValidate(req, res);
});

export default userRouter;
