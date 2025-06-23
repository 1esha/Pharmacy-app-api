exports.getProductAvailabilityByProductId = function(app,pool,jsonParser) {

    app.get("/availability/product_id", jsonParser, function(request, response){

        const productId = request.query.id;

        const sqlSelectProductAvailabilityByProductId = "select * from product_availability where product_id = ?";

        pool.query(sqlSelectProductAvailabilityByProductId, productId)
        .then(result => {
          console.log("getProductAvailabilityByProductId Успешное подключение")

          const productAvailability = result[0];
      
          console.log("getProductAvailabilityByProductId addresses",productAvailability);

            const data = {
              value: productAvailability,
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