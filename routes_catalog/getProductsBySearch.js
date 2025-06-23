exports.getProductsBySearch = function(app,pool,jsonParser) {

    app.get("/products/search", jsonParser, function(request, response){

        const partTitle = request.query.search;

        console.log("getProductsBySearch partTitle",partTitle);

        const sqlSelectTitles = `SELECT * FROM products WHERE title LIKE '${partTitle}%' LIMIT 20;`;
        
        console.log("getProductsBySearch sqlSelectTitles",sqlSelectTitles);
        pool.query(sqlSelectTitles)
        .then(result => {
          console.log("getProductsBySearch  Успешное подключение");


          const _products = result[0];

          const products = [];

          _products.forEach(element => {

            products.push({
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

          console.log("getProductsBySearch products",products);

          const data = {
            value: products,
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