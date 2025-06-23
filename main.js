const routeCreateUser = require("./routes_profile/createUser");
const routeGetUser = require("./routes_profile/getUser");
const routeGetUserId = require("./routes_profile/getUserId");
const routeGetUserById = require("./routes_profile/getUserById");
const routeEditUser = require("./routes_profile/editUser");
const routeDeleteUser = require("./routes_profile/deleteUser");
const routeChangeUserPassword = require("./routes_profile/changeUserPassword");

const routeGetAllProducts = require("./routes_catalog/getAllProducts");
const routeGetProductsByPath = require("./routes_catalog/getProductsByPath");
const routeGetPharmacyAddresses = require("./routes_catalog/getPharmacyAddresses");
const routeGetProductAvailabilityByPath = require("./routes_catalog/getProductAvailabilityByPath");
const routeGetProductById = require("./routes_catalog/getProductById");
const routeGetProductAvailabilityByProductId = require("./routes_catalog/getProductAvailabilityByProductId");
const routeGetCityByUserId = require("./routes_catalog/getCityByUserId");
const routeGetPharmacyAddressesDetails = require("./routes_catalog/getPharmacyAddressesDetails");
const rounteGetOperatingMode = require("./routes_catalog/getOperatingMode");
const routeGetProductAvailability = require("./routes_catalog/getProductAvailability");
const routeGetProductAvailabilityByIdsProducts = require("./routes_catalog/getProductAvailabilityByIdsProducts");
const routeGetProductsByIds = require("./routes_catalog/getProductsByIds");
const routeGetProductAvailabilityByAddressId = require("./routes_catalog/getProductAvailabilityByAddressId");
const routeUpdateNumbersProductsInPharmacy = require("./routes_catalog/updateNumbersProductsInPharmacy");
const routeGetProductsBySearch = require("./routes_catalog/getProductsBySearch");

const routeGetProductsFromBasket = require("./routes_basket/getProductsFromBasket");
const routeAddProductInBasket = require("./routes_basket/addProductInBasket");
const routeGetIdsProductsFromBasket = require("./routes_basket/getIdsProductsFromBasket");
const routeDeleteProductFromBasket = require("./routes_basket/deleteProductFromBasket");
const routeUpdateNumberProductsInBasket = require("./routes_basket/updateNumberProductsInBasket");
const routeDeleteProductsFromBasket = require("./routes_basket/deleteProductsFromBasket");
const routeUpdateNumbersProductsInBasket = require("./routes_basket/updateNumbersProductsInBasket");

const routeMakeOrder = require("./routes_orders/makeOrder");
const routeFinishOrder = require("./routes_orders/finishOrder");
const routeGetPurchaseHistory = require("./routes_orders/getPurchaseHistory");
const routeGetCurrentOrders = require("./routes_orders/getCurrentOrders");

const routeGetRecommendedProducts = require("./route_advertisement/getRecommendedProducts");
const routeGetHomeAdvertisement = require("./route_advertisement/getHomeAdvertisement");


const express = require("express");
const mysql = require("mysql2");

const jsonParser = express.json();
const app = express();  
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "user",
  database: "pharmacy_app_db",
  password: "maw)874=trFz21"
}).promise();


routeCreateUser.createUser(app,pool,jsonParser);
routeGetUser.getUser(app,pool,jsonParser);
routeGetUserId.getUserId(app,pool,jsonParser);
routeGetUserById.getUserById(app,pool,jsonParser);
routeEditUser.editUser(app,pool,jsonParser);
routeDeleteUser.deleteUser(app,pool);
routeChangeUserPassword.changeUserPassword(app,pool,jsonParser);

routeGetAllProducts.getAllProducts(app,pool,jsonParser);
routeGetProductsByPath.getProductsByPath(app,pool,jsonParser);
routeGetPharmacyAddresses.getPharmacyAddresses(app,pool,jsonParser);
routeGetProductAvailabilityByPath.getProductAvailabilityByPath(app,pool,jsonParser);
routeGetProductById.getProductById(app,pool,jsonParser);
routeGetProductAvailabilityByProductId.getProductAvailabilityByProductId(app,pool,jsonParser);
routeGetCityByUserId.getCityByUserId(app,pool,jsonParser);
routeGetPharmacyAddressesDetails.getPharmacyAddressesDetails(app,pool,jsonParser);
rounteGetOperatingMode.getOperatingMode(app,pool,jsonParser);
routeGetProductAvailability.getProductAvailability(app,pool,jsonParser);
routeGetProductAvailabilityByIdsProducts.getProductAvailabilityByIdsProducts(app,pool,jsonParser);
routeGetProductsByIds.getProductsByIds(app,pool,jsonParser);
routeGetProductAvailabilityByAddressId.getProductAvailabilityByAddressId(app,pool,jsonParser);
routeUpdateNumbersProductsInPharmacy.updateNumbersProductsInPharmacy(app,pool,jsonParser);
routeGetProductsBySearch.getProductsBySearch(app,pool,jsonParser);

routeGetProductsFromBasket.getProductsFromBasket(app,pool,jsonParser);
routeAddProductInBasket.addProductInBasket(app,pool,jsonParser);
routeGetIdsProductsFromBasket.getIdsProductsFromBasket(app,pool,jsonParser);
routeDeleteProductFromBasket.deleteProductFromBasket(app,pool,jsonParser);
routeUpdateNumberProductsInBasket.updateNumberProductsInBasket(app,pool,jsonParser);
routeDeleteProductsFromBasket.deleteProductsFromBasket(app,pool,jsonParser);
routeUpdateNumbersProductsInBasket.updateNumbersProductsInBasket(app,pool,jsonParser);

routeMakeOrder.makeOrder(app,pool,jsonParser);
routeFinishOrder.finishOrder(app,pool,jsonParser);
routeGetPurchaseHistory.getPurchaseHistory(app,pool,jsonParser);
routeGetCurrentOrders.getCurrentOrders(app,pool,jsonParser);

routeGetRecommendedProducts.getRecommendedProducts(app,pool,jsonParser);
routeGetHomeAdvertisement.getHomeAdvertisement(app,pool,jsonParser);

app.listen(4000);