exports.deleteProductsFromBasket = function(app,pool,jsonParser) {

    app.post("/basket/delete/products", jsonParser, function(request, response){

        const userId = request.body.userId;
        const listIdsProducts = request.body.listIdsProducts;

        console.log("deleteProductsFromBasket userId = ",userId);
        console.log("deleteProductsFromBasket listIdsProducts = ",listIdsProducts);

        const sqlDeleteProductsFromBaskett = "DELETE FROM basket WHERE user_id = ? AND product_id IN (?);";

        if(listIdsProducts.length == 0){
          return
        }

        pool.query(sqlDeleteProductsFromBaskett,[userId,listIdsProducts])
        .then(result => {
          console.log("deleteProductsFromBasket Успешное подключение")

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