exports.getProductsFromBasket = function(app,pool,jsonParser) {

    app.get("/basket/user", jsonParser, function(request, response){

        const userId = request.query.user_id;

        console.log("getProductsFromBasket userId = ",userId);

        const sqlSelectProductsFromBasket = "SELECT " + "products.product_id," +
                                            "products.title,"+
                                            "products.product_path,"+
                                            "products.price,"+
                                            "products.discount,"+
                                            "products.product_basic_info,"+
                                            "products.product_detailed_info,"+
                                            "products.image,"+
                                            "basket.number_products "+
                                            "FROM users JOIN basket "+
                                            "ON users.user_id = basket.user_id JOIN products "+
                                            "ON basket.product_id = products.product_id "+
                                            "WHERE users.user_id = ?;";

        pool.query(sqlSelectProductsFromBasket,userId)
        .then(result => {
          console.log("getProductsFromBasket Успешное подключение")

          const _products = result[0];
      
          

          const products = [];

          _products.forEach(element => {
            const product = {
              productId: element.product_id,
              title: element.title,
              productPath: element.product_path,
              price: element.price,
              discount: element.discount,
              productBasicInfo: element.product_basic_info,
              productDetailedInfo: element.product_detailed_info,
              image: element.image
            }

            products.push({
              productDataSourceModel: product,
              numberProducts: element.number_products
            })

          });

          console.log("getProductsFromBasket products",products);

          const data = {
            value: products,
            responseDataSourceModel: {
                message: "Успешно",
                status: 200
              }
          };


        response.json(data);

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