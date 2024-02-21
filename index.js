// import express, { urlencoded } from "express";
// import ProductController from "./src/controllers/product.controller.js";
// import path from "path";
// import ejsLayouts from "express-ejs-layouts";

// const server = express();

// //parse form data
// server.use(express.urlencoded({ extended: true }));
// //Setup view engine settings
// server.set("view engine", "ejs");
// server.set("views", path.join(path.resolve(), "src", "views"));

// //setup ejs layout
// server.use(ejsLayouts);
// // create an instance of ProductController
// const productController = new ProductController();
// server.get("/", productController.getProducts);
// server.get("/new", productController.getAddForm);
// server.post("/", productController.addNewProduct);
// server.use(express.static("src/views"));
// server.listen(3400);
// console.log("Server is listening on port 3400");

import express from "express";
import ProductsController from "./src/controllers/product.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import addProductValidationMiddleware from "./src/middlewares/validation.middleware.js";
const app = express();
// create an instance of ProductController
const productsController = new ProductsController();
//setup ejs layout
app.use(ejsLayouts);
app.use(express.json());
//parse form data
app.use(express.urlencoded({ extended: true }));
//Setup view engine settings
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

app.get("/", productsController.getProducts);
app.get("/add-product", productsController.getAddProduct);
app.get("/update-product", productsController.getUpdatedProductView);
app.post(
    "/",
    addProductValidationMiddleware,
    productsController.postAddProduct
);

app.listen(3400, () => {
    console.log("Server is running on port 3400");
});
