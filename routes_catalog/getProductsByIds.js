exports.getProductsByIds = function(app,pool,jsonParser) {


    app.post("/products/ids_products", jsonParser, function(request, response){

        const listIdsProducts = request.body.listIdsProducts;

        console.log("getProductsByIds listIdsProducts = ",listIdsProducts);

        const sqlSelectProductsByIdsProducts = "SELECT * FROM products WHERE product_id IN (?);";

        pool.query(sqlSelectProductsByIdsProducts,[listIdsProducts])
        .then(result => {
          console.log("getProductsByIds Успешное подключение")

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


          console.log("getProductsByIds products",products);

          const data = {
            value: products,
            responseDataSourceModel: {
                message: "Успешно",
                status: 200
              }
          };

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