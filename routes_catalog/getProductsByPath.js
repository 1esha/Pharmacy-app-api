exports.getProductsByPath = function(app,pool,jsonParser) {

    app.get("/products/path", jsonParser, function(request, response){

        const path = request.query.path;

        const sqlSelectProductsByPath = "select * from products where product_path = ?;";

        pool.query(sqlSelectProductsByPath, path)
        .then(result => {
          console.log("getProductsByPath Успешное подключение")

          const _productsAll = result[0];

          const productsAll = [];

          _productsAll.forEach(element => {

            productsAll.push({
              productId: element.product_id,
              title: element.title,
              productPath: element.product_path,
              price: element.price,
              discount: element.discount,
              productBasicInfo: element.product_basic_info,
              productDetailedInfo: element.product_detailed_info,
              image: element.image
            });

          });

          console.log("getProductsByPath productsAll",productsAll);

          const data = {
            value: productsAll,
            responseDataSourceModel: {
                message: "Успешно",
                status: 200
              }
          }


        response.json(data);

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