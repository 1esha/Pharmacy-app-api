exports.getOperatingMode = function(app,pool,jsonParser) {

    app.get("/operating_mode", jsonParser, function(request, response){

        const sqlSelectOperatingMode = "SELECT * FROM operating_mode";

        pool.query(sqlSelectOperatingMode)
        .then(result => {
          console.log("getOperatingMode Успешное подключение")

          const _modes = result[0];
      
          console.log("getOperatingMode modes",_modes);

          const modes = [];

          _modes.forEach(element => {

            const dayWeek = String(element.day_week);
            const timeFrom = String(element.time_from);

            modes.push({
                modeId: element.mode_id,
                dayWeek: dayWeek,
                timeFrom: timeFrom,
                timeBefore: element.time_before
            });

          });

          const data = {
            value: modes,
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
