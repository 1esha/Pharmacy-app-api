exports.editUser = function(app,pool,jsonParser) {

    app.post("/user/edit", jsonParser, function(request, response){

        const newUserModel = request.body;
        const userId = newUserModel.userId;
        const firstName = newUserModel.userInfoModel.firstName;
        const lastName = newUserModel.userInfoModel.lastName;
        const email = newUserModel.userInfoModel.email;
        const phoneNumber = newUserModel.userInfoModel.phoneNumber;
        const userPasswordString = newUserModel.userInfoModel.userPasswordHashCode;
        const city = newUserModel.userInfoModel.city;

        const userPassword = Number(userPasswordString);
        console.log("userPasswordString",userPasswordString);
        console.log("userPassword",userPassword);
        console.log("userModel",newUserModel);

        const sqlSelectUser = "select * from users where user_id = ?";
        const sqlSelectRelevantUsers = "SELECT * FROM users WHERE email = ? OR phone_number = ? AND user_password = ?;"
        const sqlUpdateUser = "update users set first_name=?,last_name=?,email=?,phone_number=?,city=? where user_id=?;";

        pool.query(sqlSelectRelevantUsers,[email,phoneNumber,userPassword])
        .then(result => {
          console.log("editUser Успешное подключение")

          const usersAll = result[0];
          console.log("editUser usersAll",usersAll);

              if(usersAll.length <= 1){

                console.log("editUser Не существующий пользователь");
  
                const user = usersAll[0];
         
                let currentUserId = -1;
               
                if(usersAll.length == 1){
                  currentUserId = user.user_id;
                }
                else{
              
                  currentUserId = userId;
                }
               console.log("editUser currentUserId =",currentUserId);
               console.log("editUser userId =",userId);
               
                  if (currentUserId == userId) {
              
                  pool.query(sqlUpdateUser,[firstName,lastName,email,phoneNumber,city,userId])
                  .then(result => {
                    const data = {
                        message: "Данные пользователя обнавлены",
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
                else{
                  console.log("editUser Не уникальные данные");
      
                  const data = {
                      message: "Не уникальные данные",
                      status: 406
                  }
      
                  response.json(data);
                }
  
            }
            else {
              console.log("editUser Не уникальные данные");
  
              const data = {
                  message: "Не уникальные данные",
                  status: 406
              }
  
              response.json(data);
  
            }
          //  }
            // else{

            //   const data = {
            //     message: "Не уникальные данные",
            //     status: 400
            // }

            // response.send(data)

            // }

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