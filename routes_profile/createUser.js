exports.createUser = function(app,pool,jsonParser){

    app.post("/create/user",jsonParser,function(request, response){

        const userInfo = request.body;

        console.log("userInfo",request.body);
       
        const firstName = userInfo.firstName;
        const lastName = userInfo.lastName;
        const email = userInfo.email;
        const phoneNumber = userInfo.phoneNumber;
        const userPassword = userInfo.userPasswordHashCode;
        const city = userInfo.city;

        console.log("userPassword",userPassword);

        const sqlSelectAll = "select * from users";
        const sqlInsertUser = "insert users(first_name,last_name,email,phone_number,user_password,city)values(?,?,?,?,?,?);";

        pool.query(sqlSelectAll)
        .then(result => {
            console.log("Подключение установлено");
            let counterUnique = 0
            const dataAll = result[0];
      
            dataAll.filter(function(item,index,array){
                if((item.email == email || item.phone_number == phoneNumber )&& item.user_password == userPassword){
                    counterUnique++
                    console.log("не уникальные данные", counterUnique);
                }
                else{
                    console.log("уникальные данные");
                }
                });

                if(counterUnique == 0){
                 
                   pool.query(sqlInsertUser,[firstName,lastName,email,phoneNumber,userPassword,city])
                        .then(result => {
                             console.log("result",result[0]);
                             const data = {
                                message: "Уникальные данные",
                                status: 201
                            }
                             response.send(data)
                         });
                
                }
                else{

                    const data = {
                        message: "Не уникальные данные",
                        status: 400
                    }

                    response.send(data)
                }

        })
        .catch(function(err) {
            const result = {
                message: "Ошибка сервера",
                status: 500
            }
            response.send(result);
            console.log("Ошибка:"+err.message);
          });

    });
};