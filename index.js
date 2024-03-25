import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import productRouter from "./src/features/Products/Product.routes.js";
import userRouter from "./src/features/User/User.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`Server is listening at PORT: ${PORT}`);
});
