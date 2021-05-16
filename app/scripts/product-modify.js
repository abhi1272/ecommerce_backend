const MongoClient = require('mongodb').MongoClient
const {performance} = require('perf_hooks')
const mongoConnectionString = 'mongodb+srv://admin:Abhi%40awz5@cluster0-vqxjh.mongodb.net/pharmaApp?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
const mainDbName = 'pharmaApp'


const getCollection = async () =>{
    const client = await MongoClient.connect(mongoConnectionString)
    console.log('Database connected successfully')
    const db = client.db(mainDbName)
    const medicines = db.collection('medicines')
    const pune_medical_stores = db.collection('pune_medical_stores')
    return {medicines, pune_medical_stores}
}

const updateData = async (medicines, pune_medical_stores) => {

    // const product = await medicines.find({}).toArray()
    // const pharmacist = await pune_medical_stores.find({}).toArray()
    // for(let i=0; i<product.length; i++){
    //     const random = Math.floor(Math.random()*134)
    //     await medicines.updateOne( {_id: product[i]._id},{ $set: { pharmacist: pharmacist[random] } })
    // }

    await medicines.aggregate([
        { $project: { item: 1, composition: { $trim: { input: "$composition" } } } }
     ])
}

const run = async () => {
    try{
        const t0 = performance.now()
        console.log('Get collections')
        const {medicines, pune_medical_stores} = await getCollection(mongoConnectionString)
        const updateResult = await updateData(medicines, pune_medical_stores)
        const t1 = performance.now()
        return 'Successful'
    }catch(e){
        console.log(e)
    }
}

run().then(result => {
    console.log(result); process.exit(0)
}).catch(e => {
    console.log(e); process.exit(1)
})



// MongoClient.connect(mongoConnectionString, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db(mainDbName);
//     const medicines = dbo.collection("medicines")
//     const pune_medical_stores = dbo.collection("pune_medical_stores")
//     medicines.find({}).toArray(function(err, result) {
//       if (err) throw err;
//       console.log(result);
//       for(let i = 0; i<result.length; i++){
//       }
//     //   db.close();
//     });
//   });