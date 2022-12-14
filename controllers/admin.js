const Product = require('../models/product')
const Category = require('../models/category')

module.exports.getProducts = (req, res, next) =>{
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products,
                path: '/admin/products',
                action: req.query.action
            })
        }).catch((error) => {
            console.log(error);
        });
 }

 exports.getAddProduct = (req, res, next) =>{
     Category.findAll()
         .then((categories) => {
             res.render('admin/add-product', {
                 title: 'Add a new product',
                 categories: categories,
                 path: '/admin/add-product'
             });
         })
         .catch((err) => {
             console.log(err);
         })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product()

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categoryid = req.body.categoryid;
    const user = req.user;

    /*Product.create({ name: name, price: price, imageUrl: imageUrl, description: description, categoryId: categoryid, userId: userid})
        .then((result) => {
            console.log(result);
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        })*/
    user.createProduct({
        name: name,
        price: price,
        imageUrl: imageUrl,
        description: description,
        categoryId: categoryid
    })
    .then((result) => {
        console.log(result);
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
    })
}

 exports.getEditProduct = (req, res, next) =>{
    Product.findByPk(req.params.productid)
        .then((product) => {
            if (!product) {
                return res.redirect('/');
            }
            Category.findAll()
                .then((categories) => {
                    res.render('admin/edit-product', {
                        title: 'Edit Product',
                        product: product,
                        categories: categories,
                        path: '/admin/products'
                    });
                })
                .catch((err) => {
                    console.log(err);
                })

        })
        .catch((err) => {
            console.log(err);
        });

}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categoryid = req.body.categoryid;
    const userid = req.user.id;

    Product.findByPk(id)
        .then((product) => {
            product.name = name;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description;
            product.categoryid = categoryid;
            product.userId = userid;
            return product.save()
        })
        .then((result) => {
            console.log(result);
            res.redirect('/admin/products?action=edit');
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const productid = req.body.id;
    Product.findByPk(productid)
        .then((product) => {
            return product.destroy();
        })
        .then((result) => {
            console.log('Product has been deleted')
            res.redirect('/admin/products?action=delete');
        })
        .catch((err) => {
            console.log(err);
        })
}