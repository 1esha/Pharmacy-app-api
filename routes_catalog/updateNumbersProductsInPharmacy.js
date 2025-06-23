exports.updateNumbersProductsInPharmacy = function(app,pool,jsonParser) {

    app.post("/products/update_number_products", jsonParser, function(request, response){
      
        const addressId = request.body.addressId;
        const listNumberProducts = request.body.listNumberProducts;

        const sqlSelectInPharmacy = "SELECT * FROM product_availability WHERE address_id = ?;";

        pool.query(sqlSelectInPharmacy,[addressId])
        .then(result => {
          console.log("updateNumbersProductsInPharmacy Успешное подключение")

          const listProductAvailability = result[0];

          console.log("updateNumbersProductsInPharmacy listProductAvailability",listProductAvailability);
          console.log("updateNumbersProductsInPharmacy addressId",addressId);

          const listForUpdate = [];

          for(let i = 0; i < listNumberProducts.length; i++){

            const numberProduct = listNumberProducts[i];

            const productAvailability = listProductAvailability.find(it => it.product_id == numberProduct.productId );

            listForUpdate.push({
              productId: numberProduct.productId,
              numberProducts: productAvailability.number_products - numberProduct.numberProducts
            })
          }

        
          let query = "";

          let idsProducts = "";
  
          for(let i = 0; i < listForUpdate.length; i++){
            const productId = listForUpdate[i].productId;
            const numberProduct = listForUpdate[i].numberProducts;
  
            let comma = ""
            if(i == 0) comma =""
            else comma = ","
  
            idsProducts += `${comma}${productId}`
  
            query += `WHEN product_id = ${productId} THEN ${numberProduct} `;
          }
  
          console.log(query);

          console.log("updateNumbersProductsInPharmacy listForUpdate",listForUpdate);

          const sqlUpdateNumberProducts = `UPDATE product_availability SET number_products = CASE ${query} END WHERE product_id IN (${idsProducts}) AND address_id = ${addressId};`;

          pool.query(sqlUpdateNumberProducts)
          .then(result => {

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