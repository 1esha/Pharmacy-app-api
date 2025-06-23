exports.getIdsProductsFromBasket = function(app,pool,jsonParser) {

    app.get("/basket/user/products_id", jsonParser, function(request, response){

        const userId = request.query.user_id;

        console.log("getIdsProductsFromBasket userId = ",userId);

        const sqlSelectProductsFromBasket = "SELECT product_id FROM basket WHERE user_id = ?;"

        pool.query(sqlSelectProductsFromBasket,userId)
        .then(result => {
          console.log("getIdsProductsFromBasket Успешное подключение")

          const idsProducts = result[0];
      
          console.log("getIdsProductsFromBasket idsProducts",idsProducts);

          const data = {
            value: idsProducts,
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