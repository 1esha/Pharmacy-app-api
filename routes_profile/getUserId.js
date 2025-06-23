exports.getUserId = function(app,pool,jsonParser){

    app.post("/user_id",jsonParser,function(request, response){

        const userInfo = request.body;

        console.log("getUserId userInfo",request.body);
       
        const firstName = userInfo.firstName;
        const lastName = userInfo.lastName;
        const email = userInfo.email;
        const phoneNumber = userInfo.phoneNumber;
        const userPasswordString = userInfo.userPasswordHashCode;
        const city = userInfo.city;

        const userPassword = Number(userPasswordString);

        const sqlSelectUser = "select * from users where first_name = ? and last_name = ? and email = ? and phone_number = ? and user_password = ? and city = ?;";

        pool.query(sqlSelectUser,[firstName,lastName,email,phoneNumber,userPassword,city])
        .then(result => {
            console.log("Подключение установлено");
            const usersAll = result[0];
            console.log("getUserId usersAll",usersAll);
            if(usersAll.length == 1){
                const user = usersAll[0];
                console.log("getUserId user",user);
                console.log("getUserId userId",user.user_id);
                const data = {
                    value:user.user_id,
                    responseDataSourceModel: {
                        message: "Существующий пользователь",
                        status: 200
                      }
                };
                response.send(data)
            }
            else if(usersAll.length < 1){
                const data = {
                    value:-1,
                    responseDataSourceModel: {
                        message: "Не существующий пользователь",
                        status: 404
                      }
                };
                response.send(data)
            }
            else{
                const data = {
                    value:-1,
                    responseDataSourceModel: {
                        message: "Данные пользователя не уникальны!",
                        status: 406
                      }
                };
                response.send(data)
            }
      

        })
        .catch(function(err) {
           const data = {
                userId:-1,
                responseDataSourceModel: {
                    message: "Ошибка сервера",
                    status: 500
                    }
                };
            response.send(data);
            console.log("Ошибка:"+err.message);
          });

    });
};