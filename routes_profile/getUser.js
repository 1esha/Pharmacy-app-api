exports.getUser = function(app,pool,jsonParser) {

    app.post("/user", jsonParser, function(request, response){

        const logInModel = request.body;
        const login = logInModel.login;
        const userPassword = logInModel.userPasswordHashCode;

        console.log(login, userPassword);

        console.log("logInModel",logInModel);
    
        const sqlSelectUser = "select * from users where (email=? or phone_number=?) and user_password=?;";

        pool.query(sqlSelectUser,[login,login,userPassword])
        .then(result => {
          console.log("getUser Успешное подключение")

          const usersAll = result[0];
          console.log("getUser usersAll",usersAll);

          if(usersAll.length == 1){

              console.log("getUser Существующий пользователь");

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


              console.log("getUser data",data);

              response.json(data);
          }
          else if(usersAll.length == 0){

            console.log("getUser Не существующий пользователь");

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
            console.log("getUser Не уникальные данные");

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