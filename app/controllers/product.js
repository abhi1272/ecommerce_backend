const ProductModel = require("../models/Product");
const logger = require("../libs/loggerLib");
const check = require("../libs/checkLib");
const response = require("../libs/responseLib");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const streamifier = require('streamifier')
const MedicineModel = require('../models/Medicine')
cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

let addPrescription = async (req, res) => {
  const result = await addImageToCloud(req,'prescription')
  res.send(result)
};

let getSingleProduct = (req, res) => {
  ProductModel.find({ medicine_id: req.params.id }).exec((err, result) => {
    if (err) {
      logger.captureError(
        "some error occured",
        "productController : getProduct",
        10
      );
      let apiResponse = response.generate(true, "some error occured", 400, err);
      res.send(apiResponse);
    } else if (check.isEmpty(result)) {
      let apiResponse = response.generate(true, "product not found", 500, null);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(false, "product found", 200, result);
      res.send(apiResponse);
    }
  });
};

let getAllProduct = (req, res) => {
  ProductModel.find({}).exec(
    (err, result) => {
      if (err) {
        logger.captureError(
          "some error occured",
          "productController : getProduct",
          10
        );
        let apiResponse = response.generate(
          true,
          "some error occured",
          400,
          err
        );
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(
          true,
          "product not found",
          500,
          null
        );
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "product found",
          200,
          result
        );
        res.send(apiResponse);
      }
    }
  );
};

let addProduct = async (req, res) => {
  let imageUploadResponse;
  if (req.file) {
    imageUploadResponse = await addImageToCloud(req, 'Medicines');
  }

  let Product = ProductModel({
    ...req.body,
    uuid:uuidv4(),
    image:imageUploadResponse ? imageUploadResponse.secure_url : ''
  });

  let Medicine = MedicineModel({
    ...req.body,
    uuid:uuidv4(),
    image:imageUploadResponse ? imageUploadResponse.secure_url : ''
  });

  Product.save((err, result) => {
    if (err) {
      console.log(err)
      logger.captureError(
        "some error occured",
        "productController : addProduct",
        10
      );
      let apiResponse = response.generate(true, "some error occured", 400, err);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(true, "product saved", 200, result);
      Medicine.save()
      res.send(apiResponse);
      console.log(result);
    }
  });
};

let editProduct = (req, res) => {
  let options = req.body;
  ProductModel.updateOne({ _id: req.params.id }, options, (err, result) => {
    if (err) {
      logger.captureError(
        "some error occured",
        "productController: editProduct"
      );
      let apiResponse = response.generate(true, "some error occured", 400, err);
      res.send(apiResponse);
    } else if (check.isEmpty(result)) {
      let apiResponse = response.generate(true, "product not found", 500, null);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(
        false,
        `product updated successfully ${req.params.Batch}`,
        200,
        result
      );
      res.send(apiResponse);
    }
  });
};

let deleteProduct = (req, res) => {
  console.log(req.params.Batch);
  ProductModel.deleteMany({ Batch: req.params.Batch }, (err, result) => {
    if (err) {
      logger.captureError(
        "error occured",
        "productController : deleteProduct",
        10
      );
      res.send(err);
    } else if (check.isEmpty(result)) {
      let apiResponse = response.generate(true, "product not found", 500, null);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(
        false,
        `product ${req.params.Batch} deleted found`,
        500,
        null
      );
      res.send(apiResponse);
    }
  });
};

const addImageToCloud = async (req,folderName) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
  });
};

module.exports = {
  getSingleProduct: getSingleProduct,
  getAllProduct: getAllProduct,
  addProduct: addProduct,
  editProduct: editProduct,
  deleteProduct: deleteProduct,
  addPrescription,
};
