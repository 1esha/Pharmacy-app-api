exports.getUserById = function(app,pool,jsonParser) {

    app.get("/user_by_id", jsonParser, function(request, response){

        const userId = request.query.id;

        console.log("userId",userId);
    
        const sqlSelectUser = "select * from users where user_id = ?";

        pool.query(sqlSelectUser,userId)
        .then(result => {
          console.log("getUserById Успешное подключение")

          const usersAll = result[0];
          console.log("getUserById usersAll",usersAll);

          if(usersAll.length == 1){

              console.log("getUserById Существующий пользователь");

              const user = usersAll[0];

              const data = {
                value: {
                  userId:user.user_id,
                  userInfoModel:{
                  firstName:user.first_name,
                  lastName:user.last_name,
                  email:user.email,
                  phoneNumber:user.phone_number,
                  userPasswordHashCode:user.user_password,
                  city:user.city
                  }
                },
                responseDataSourceModel: {
                    message: "Существующий пользователь",
                    status: 200
                  }
              }


              console.log("getUserById data",data);

              response.json(data);
          }
          else if(usersAll.length == 0){

            console.log("getUserById Не существующий пользователь");

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
            console.log("getUserById Не уникальные данные");

            const data = {
                value: null,
                responseDataSourceModel: {
                    message: "Не уникальные данные",
                    status: 406
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