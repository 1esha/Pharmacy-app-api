exports.getProductAvailabilityByIdsProducts = function(app,pool,jsonParser) {


    app.post("/availability/ids_products", jsonParser, function(request, response){

        const listIdsProducts = request.body.listIdsProducts;

        console.log("getProductAvailabilityByIdsProducts listIdsProducts = ",listIdsProducts);

        const sqlSelectProductAvailabilityByIdsProducts = "SELECT * FROM product_availability WHERE product_id IN (?);";

        pool.query(sqlSelectProductAvailabilityByIdsProducts,[listIdsProducts])
        .then(result => {
          console.log("getProductAvailabilityByIdsProducts Успешное подключение")

          const productAvailability = result[0];


          console.log("getProductAvailabilityByIdsProducts productAvailability",productAvailability);

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