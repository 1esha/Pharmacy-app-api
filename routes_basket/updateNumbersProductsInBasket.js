exports.updateNumbersProductsInBasket = function(app,pool,jsonParser) {

    app.post("/basket/update/products", jsonParser, function(request, response){
      console.log("updateNumbersProductsInBasket body = ",request.body);
        const userId = request.body.userId;
        const listNumberProducts = request.body.listNumberProducts;

        console.log("updateNumbersProductsInBasket userId = ",userId);

        let query = "";

        let idsProducts = "";

        for(let i = 0; i < listNumberProducts.length; i++){
          const productId = listNumberProducts[i].productId;
          const numberProduct = listNumberProducts[i].numberProducts;

          let comma = ""
          if(i == 0) comma =""
          else comma = ","

          idsProducts += `${comma}${productId}`

          query += `WHEN product_id = ${productId} THEN ${numberProduct} `;
        }

        console.log(query);

        const sqlUpdateNumberProductsInBasket = `UPDATE basket SET number_products = CASE ${query} END WHERE product_id IN (${idsProducts}) AND user_id = ${userId};`;

        if(idsProducts.length == 0){
          return
        }

        pool.query(sqlUpdateNumberProductsInBasket)
        .then(result => {
          console.log("updateNumbersProductsInBasket Успешное подключение")

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

          console.log("U Ошибка:"+err.message);
        });

    });

}