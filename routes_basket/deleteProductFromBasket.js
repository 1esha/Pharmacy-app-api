exports.deleteProductFromBasket = function(app,pool){

    app.get("/basket/delete",function(request, response){

        const userId = request.query.user_id;
        const productId = request.query.product_id;

        sqlDeleteProduct = "DELETE FROM basket WHERE user_id = ? AND product_id = ?;";

        pool.query(sqlDeleteProduct,[userId,productId])
        .then(result => {
            console.log("deleteProductFromBasket Успешное удаление под user_id", userId);
            const data = {
                message: "Товар удален из корзины",
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