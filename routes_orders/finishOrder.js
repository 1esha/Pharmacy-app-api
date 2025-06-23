exports.finishOrder = function(app,pool,jsonParser) {

    app.get("/orders/finish", jsonParser, function(request, response){

        const orderId = request.query.order_id;

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

        const currentDataTime = `${today.getFullYear()}-${month}-${date} ${today.toLocaleTimeString()}`;

        const sqlUpdateFinishedOrders = `UPDATE orders SET  is_actual = 0, end_date = '${currentDataTime}' WHERE order_id = ${orderId};`;

        

        pool.query(sqlUpdateFinishedOrders)
        .then(result => {
          console.log("finishOrder Успешное подключение")

          console.log("finishOrder currentDataTime",currentDataTime);

          const data = {
            message: "Успешно",
            status: 200
          }

          response.json(data);
    })
        .catch(function(err) {

            const data = {
                message: "Ошибка сервера",
                status: 500
              }


            response.json(data);

          console.log("Ошибка:"+err.message);
        });

    });

}