exports.changeUserPassword = function(app,pool,jsonParser) {

    app.post("/user/edit/password", jsonParser, function(request, response){

        const userId = request.body.userId;
        const oldUserPassword = request.body.oldUserPassword;
        const newUserPassword = request.body.newUserPassword;
        console.log("changeUserPassword userId",userId);
        const sqlSelectRelevantUsers = "SELECT * FROM users WHERE user_id = ? AND user_password = ?;"
        const sqlUpdateUserPassword = "UPDATE users SET user_password = ? where user_id = ?;";

        pool.query(sqlSelectRelevantUsers,[userId,oldUserPassword])
        .then(result => {
          console.log("changeUserPassword Успешное подключение")

          const usersAll = result[0];
          console.log("changeUserPassword usersAll",usersAll);

              if(usersAll.length == 1){

                console.log("changeUserPassword Текущий пользователь");
  
                const user = usersAll[0];
         
                pool.query(sqlUpdateUserPassword,[newUserPassword,userId])
                  .then(result => {
                    const data = {
                        message: "Пароль пользователя изменен",
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
  
            }
            else {
              console.log("changeUserPassword Не уникальные данные");
  
              const data = {
                  message: "Неверный пароль",
                  status: 406
              }
  
              response.json(data);
  
            }

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