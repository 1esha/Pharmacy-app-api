exports.updateNumberProductsInBasket = function(app,pool,jsonParser) {

    app.get("/basket/update", jsonParser, function(request, response){

        const userId = request.query.user_id;
        const productId = request.query.product_id;
        const numberProducts = request.query.number_products;

        console.log("updateNumberProductsInBasket userId = ",userId);
        console.log("updateNumberProductsInBasket productId = ",productId);
        console.log("updateNumberProductsInBasket numberProductserId = ",numberProducts);

        const sqlUpdateNumberProductsInBasket = "UPDATE basket SET number_products = ? WHERE user_id=? AND product_id = ?;";

        pool.query(sqlUpdateNumberProductsInBasket,[numberProducts,userId,productId])
        .then(result => {
          console.log("updateNumberProductInBasket Успешное подключение")

          const data = {
            message: "Успешно",
            status: 200
          };


        response.json(data);

    })
        .catch(function(err) {

              const data = {
                message: "Ошибка сервера",
                status: 500
              };

            response.json(data);

          console.log("Ошибка:"+err.message);
        });

    });

}