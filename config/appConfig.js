let appConfig = {};

appConfig.port = process.env.PORT || 5000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: process.env.MONGODB_LOCAL_URL || 'mongodb://127.0.0.1:27017/pharmaApp'
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