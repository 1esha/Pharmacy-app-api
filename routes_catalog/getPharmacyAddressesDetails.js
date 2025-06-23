exports.getPharmacyAddressesDetails = function(app,pool,jsonParser) {

    app.get("/pharmacy/addresses_details", jsonParser, function(request, response){

        const sqlSelectPharmacyAddressesDetails = "SELECT pharmacy_addresses.address_id, pharmacy_addresses.city, pharmacy_addresses.address,"
        +"pharmacy_addresses_details.latitude, pharmacy_addresses_details.longitude, pharmacy_addresses_details.image, pharmacy_addresses_details.mode_id"
        +" FROM pharmacy_addresses JOIN pharmacy_addresses_details ON pharmacy_addresses.address_id = pharmacy_addresses_details.address_id;";

        pool.query(sqlSelectPharmacyAddressesDetails)
        .then(result => {
          console.log("getPharmacyAddressesDetails Успешное подключение")

          const addresses = result[0];
      
          console.log("getPharmacyAddressesDetails addresses",addresses[0].image);

          const values = [];

          addresses.forEach(element => {
            values.push(
                {
                    pharmacyAddressesDataSourceModel: {
                        address_id: element.address_id,
                        address: element.address,
                        city: element.city
                    },
                    latitude: element.latitude,
                    longitude: element.longitude,
                    image: element.image,
                    modeId: element.mode_id
                }
                
            )
          });

          console.log("getPharmacyAddressesDetails values =", values );

          const data = {
            value: values,
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
