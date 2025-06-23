exports.getProductById = function(app,pool,jsonParser) {

    app.get("/product/id", jsonParser, function(request, response){

        const productId = request.query.id;

        const sqlSelectProductById = "select * from products where product_id = ?;";

        pool.query(sqlSelectProductById, productId)
        .then(result => {
          console.log("getProductById Успешное подключение")

          const productsAll = result[0];
          console.log("getProductById productsAll",productsAll);

          if (productsAll.length <= 0) {
            const data = {
                value: null,
                responseDataSourceModel: {
                    message: "Не существующий продукт",
                    status: 401
                  }
              }
    
            response.json(data);
          }
          else {

            const _product = productsAll[0];

            const product = {
              productId: _product.product_id,
              title: _product.title,
              productPath: _product.product_path,
              price: _product.price,
              discount: _product.discount,
              productBasicInfo: _product.product_basic_info,
              productDetailedInfo: _product.product_detailed_info,
              image: _product.image
            }

            const data = {
                value: product,
                responseDataSourceModel: {
                    message: "Успешно",
                    status: 200
                  }
              }
    
    
            response.json(data);

          }

    })
        .catch(function(err) {

            const data = {
                value: null,
                responseDataSourceModel: {
                    message: "Ошибка сервера",
                    status: 500
                  }
              }


            response.json(data);

          console.log("Ошибка:"+err.message);
        });

    });

}