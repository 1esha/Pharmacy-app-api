exports.deleteUser = function(app,pool){

    app.get("/user/delete",function(request, response){

        const userId = request.query.id;
        sqlDeleteUSer = "delete from users where user_id=?;";

        pool.query(sqlDeleteUSer,userId)
        .then(result => {
            console.log("deleteUser Успешное удаление под id", userId);
            const data = {
                message: "Пользователь успешно удален",
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