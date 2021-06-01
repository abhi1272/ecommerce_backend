let appConfig = {};

appConfig.port = process.env.PORT || 8000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: process.env.MONGODB_PROD_URL
};
appConfig.apiVersion = '/api/v1';
model = ''
  

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion,
    model:model
};