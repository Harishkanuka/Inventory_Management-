import ProductModel from "../models/product.model.js";

class ProductsController {
    getProducts(req, res, next) {
        var products = ProductModel.getAll();
        res.render("index", { products });
    }

    getAddProduct(req, res, next) {
        res.render("new-product", {
            errorMessage: null,
        });
    }

    postAddProduct(req, res, next) {
        ProductModel.add(req.body);
        var products = ProductModel.getAll();
        res.render("index", { products });
    }
    getUpdatedProductView(req, res, next) {
        // 1. If the product exists then return the view
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if (productFound) {
            res.render("update-product", {
                product: productFound,
                errorMessage: null,
            });
        }
        // 2. else return the error
        else {
            res.status(401).send("Product not found");
        }
    }
    postUpdateProduct(req, res) {
        ProductModel.update(req.body);
        var products = ProductModel.getAll();
        res.render("index", { products });
    }
}

export default ProductsController;
