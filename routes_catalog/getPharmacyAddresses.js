exports.getPharmacyAddresses = function(app,pool,jsonParser) {

    app.get("/pharmacy/addresses", jsonParser, function(request, response){

        const sqlSelectPharmacyAddresses = "SELECT * FROM pharmacy_addresses";

        pool.query(sqlSelectPharmacyAddresses)
        .then(result => {
          console.log("getPharmacyAddresses Успешное подключение")

          const addresses = result[0];
      
          console.log("getPharmacyAddresses addresses",addresses);

          const data = {
            value: addresses,
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

