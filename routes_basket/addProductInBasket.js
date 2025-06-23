exports.addProductInBasket = function(app,pool,jsonParser) {

    app.get("/basket/add", jsonParser, function(request, response){

        const userId = request.query.user_id;
        const productId = request.query.product_id;
        const numberProducts = request.query.number_products;

        console.log("addProductInBasket userId = ",userId);
        console.log("addProductInBasket productId = ",productId);
        console.log("addProductInBasket numberProductserId = ",numberProducts);

        const sqlInsertBasket = "INSERT basket VALUES (?,?,?);";

        pool.query(sqlInsertBasket,[userId,productId,numberProducts])
        .then(result => {
          console.log("addProductInBasket Успешное подключение")

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