exports.getProductAvailabilityByPath = function(app,pool,jsonParser) {

    app.get("/availability", jsonParser, function(request, response){

        const path = request.query.path;

        const sqlSelectProductAvailabilityByPath = "select * from product_availability where product_path = ?";

        pool.query(sqlSelectProductAvailabilityByPath, path)
        .then(result => {
          console.log("getProductAvailabilityByPath Успешное подключение")

          const productAvailability = result[0];
      
          console.log("getProductAvailabilityByPath addresses",productAvailability);

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