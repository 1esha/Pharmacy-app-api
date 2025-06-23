exports.getPurchaseHistory = function(app,pool,jsonParser) {

    app.get("/orders/purchase_history", jsonParser, function(request, response){

        const userId = request.query.user_id;
        console.log("getPurchaseHistory userId",userId);
        const sqlSelectPurchaseHistory = "SELECT * FROM orders WHERE user_id = ? AND is_actual = 0;"
        

        pool.query(sqlSelectPurchaseHistory,[userId])
        .then(result => {
          console.log("getPurchaseHistory  Успешное подключение");


          const _orders = result[0];

          const orders = [];

          _orders.forEach(element => {

            orders.push({
              orderId: element.order_id,
              productId: element.product_id,
              addressId: element.address_id,
              userId: element.user_id,  
              numberProduct: element.number_prouct,
              isActual: element.is_actual,
              orderDate: element.order_date,
              endDate: element.end_date
            });

          });

          console.log("getPurchaseHistory orders",orders);

          const data = {
            value: orders,
            responseDataSourceModel: {
                message: "Успешно",
                status: 200
              }
          }

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