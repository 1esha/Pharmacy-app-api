exports.getProductAvailability = function(app,pool,jsonParser) {

    app.get("/availability/all", jsonParser, function(request, response){

        const sqlSelectProductAvailability = "select * from product_availability";

        pool.query(sqlSelectProductAvailability)
        .then(result => {
          console.log("getProductAvailability Успешное подключение")

          const productAvailability = result[0];
      
          console.log("getProductAvailability addresses",productAvailability);

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