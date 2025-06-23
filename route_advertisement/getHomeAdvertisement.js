exports.getHomeAdvertisement = function(app,pool,jsonParser) {

    app.get("/products/advertisement/home", jsonParser, function(request, response){
        try{
            console.log("getHomeAdvertisement Успешное подключение")

            const advertisements = [
                "https://persen.ru/night/f/i/sharing-2.jpg",
                "https://avatars.mds.yandex.net/i?id=2b57b1abf1d4118762992120cb53e1dc_l-5435106-images-thumbs&n=13",
                "https://blotos.ru/wp-content/uploads/4/2/a/42a958722edf890d37103d4064cbd91d.png",
                "https://mdc51.ru/wp-content/uploads/2021/09/obzor-effektivnyh-preparatov-ot-golovnoj-boli-spisok-lekarstvennyh-sredstv-v-tabletkah.jpg",
            ];

            const data = {
                value: advertisements,
                responseDataSourceModel: {
                    message: "Успешно",
                    status: 200
                  }
              }
    
    
            response.json(data);
        }
        catch{

            const data = {
                value: null,
                responseDataSourceModel: {
                    message: "Ошибка сервера",
                    status: 500
                  }
              }


            response.json(data);

          console.log("Ошибка:"+err.message);
        }

    });

}