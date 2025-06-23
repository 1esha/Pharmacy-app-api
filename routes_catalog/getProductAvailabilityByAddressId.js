exports.getProductAvailabilityByAddressId = function(app,pool,jsonParser) {

    app.post("/availability/address_id", jsonParser, function(request, response){
      
        const addressId = request.body.addressId;
        console.log("getProductAvailabilityByAddressId addressId",addressId);
        const listIdsProducts = request.body.listIdsProducts;
        console.log("getProductAvailabilityByAddressId listIdsProducts",listIdsProducts);

        const sqlSelectProductAvailabilityByAddressId = "SELECT * FROM product_availability WHERE address_id = ? AND product_id IN (?);";

        pool.query(sqlSelectProductAvailabilityByAddressId, [addressId,listIdsProducts])
        .then(result => {
          console.log("getProductAvailabilityByAddressId Успешное подключение");

          const productAvailability = result[0];
      
          console.log("getProductAvailabilityByAddressId productAvailability",productAvailability);

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