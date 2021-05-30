let appConfig = {};

appConfig.port = process.env.PORT || 8000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    // uri: 'mongodb+srv://admin:Abhi%40awz5@cluster0-vqxjh.mongodb.net/pharmaApp?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
    uri: 'mongodb+srv://and_navi:Asdfgh1%40@cluster0.j3pet.mongodb.net/ePharmacy?authSource=admin&replicaSet=atlas-1vgscx-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
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