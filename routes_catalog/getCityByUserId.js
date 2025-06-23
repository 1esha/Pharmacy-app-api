exports.getCityByUserId = function(app,pool,jsonParser) {

    app.get("/city/user_id", jsonParser, function(request, response){

        const userId = request.query.id;

        const sqlSelectCityByUserId = "select city from users where user_id = ?;";

        pool.query(sqlSelectCityByUserId, userId)
        .then(result => {
          console.log("getCityByUserId Успешное подключение")

          const citiesAll = result[0];
          console.log("getCityByUserId citiesAll",citiesAll);

          if (citiesAll.length <= 0) {
            const data = {
                value: null,
                responseDataSourceModel: {
                    message: "Не существующий пользователь",
                    status: 401
                  }
              }
    
            response.json(data);
          }
          else {

            const city = citiesAll[0];
            console.log("getCityByUserId city" ,city);
            const data = {
                value: city,
                responseDataSourceModel: {
                    message: "Успешно",
                    status: 200
                  }
              }
    
    
            response.json(data);

          }

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