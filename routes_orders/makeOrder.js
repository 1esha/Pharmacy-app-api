exports.makeOrder = function(app,pool,jsonParser) {

    app.post("/orders/make", jsonParser, function(request, response){
      console.log("makeOrder body = ",request.body);

        const userId = request.body.userId;
        const addressId = request.body.addressId;
        const listNumberProducts = request.body.listNumberProducts;

        console.log("makeOrder userId = ",userId);
        console.log("makeOrder addressId = ",addressId);
        console.log("makeOrder listNumberProducts = ",listNumberProducts);

        const today = new Date();

        let month = today.getMonth()+1;
        if (month.toString.length == 1){
          month = `0${month}`;
        }

        let date = today.getDate();
        console.log("date.toString.length",date.toString.length);
        console.log("date",date.toString());
        if (date.toString().length == 1){
          date = `0${date}`;
        }

        const orderDate = `${today.getFullYear()}-${month}-${date} ${today.toLocaleTimeString()}`;

        console.log("DATE TIME",orderDate);
        const sqlSelectOrdes = "SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1;";

        pool.query(sqlSelectOrdes)
        .then(result => {
          console.log("makeOrder Успешное подключение");

          const listOrderId = result[0];

          const oldOrderId = listOrderId[0].order_id;

          console.log("makeOrder oldOrderId",oldOrderId);

          //----------------------------------------------------------
          const newOrderId = oldOrderId + 1;

          let values = "";

          let endSign = "";

          for(let i = 0; i < listNumberProducts.length; i++){
            const productId = listNumberProducts[i].productId;
            const numberProduct = listNumberProducts[i].numberProducts;

            if(i == listNumberProducts.length - 1) endSign = ";"
            else endSign = ","

            values += `(${newOrderId},${productId},${addressId},${userId},${numberProduct},1,'${orderDate}',null)${endSign}`;
            
          };

          const sqlInsertOrder = `INSERT INTO orders(order_id,product_id,address_id,user_id,number_prouct ,is_actual,order_date,end_date) VALUES ${values}`;

          console.log(sqlInsertOrder);

          pool.query(sqlInsertOrder)
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