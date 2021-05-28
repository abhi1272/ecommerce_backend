const ProductModel = require("../models/Product");
const logger = require("../libs/loggerLib");
const check = require("../libs/checkLib");
const response = require("../libs/responseLib");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const streamifier = require('streamifier')
const MedicineModel = require('../models/Medicine')
const PDFDocument = require("pdfkit");

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
});

let addPrescription = async(req, res) => {
    const result = await addImageToCloud(req, 'prescription')
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

let addProduct = async(req, res) => {
    let imageUploadResponse;
    if (req.file) {
        imageUploadResponse = await addImageToCloud(req, 'Medicines');
    }

    let Product = ProductModel({
        ...req.body,
        uuid: uuidv4(),
        image: imageUploadResponse ? imageUploadResponse.secure_url : ''
    });

    let Medicine = MedicineModel({
        ...req.body,
        uuid: uuidv4(),
        image: imageUploadResponse ? imageUploadResponse.secure_url : ''
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

const addImageToCloud = async(req, folderName) => {
    return new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream({
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

// const createInvoice = async (req, res) => {

//   const invoice = JSON.parse(req.query.data)

//   let doc = new PDFDocument({ margin: 50 });

//   generateHeader(doc, invoice);
//   generateCustomerInformation(doc, invoice);
//   generateInvoiceTable(doc, invoice);
//   generateFooter(doc);

//   doc.end();
//   doc.pipe(res);
//   // cloudinary.uploader.upload(doc.pipe(),{folder:'report'},function(res,err){console.log(res,err)});
// }

const createInvoice = async(req, res) => {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    const invoice = JSON.parse(req.query.data)

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    doc.end();
    doc.pipe(res);
}

function generateHeader(doc) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("ePharmacy", 110, 57)
        .fontSize(10)
        .text("ePharmacy", 200, 50, { align: "right" })
        .text("Parvati, Vidya Nagari", 200, 65, { align: "right" })
        .text("Pune , 411009", 200, 80, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
        .fontSize(10)
        .text("Invoice Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text('#' + invoice.invoice_nr, 150, customerInformationTop)
        .font("Helvetica")
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(formatDate(new Date()), 150, customerInformationTop + 15)
        .text("Balance Due:", 50, customerInformationTop + 30)
        .text(
            formatCurrency(invoice.subtotal - invoice.paid),
            150,
            customerInformationTop + 30
        )

    .font("Helvetica-Bold")
        .text(invoice.shipping.name, 300, customerInformationTop)
        .font("Helvetica")
        .text(invoice.shipping.address, 300, customerInformationTop + 15)
        .text(
            invoice.shipping.city +
            ", " +
            invoice.shipping.state +
            ", " +
            invoice.shipping.country,
            300,
            customerInformationTop + 30
        )
        .moveDown();

    generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Item",
        "Description",
        "Unit Cost",
        "Quantity",
        "Line Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.item,
            item.description,
            formatCurrency(item.amount),
            item.quantity,
            formatCurrency(item.amount * item.quantity)
        );

        generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Subtotal",
        "",
        formatCurrency(invoice.subtotal)
    );

    const paidToDatePosition = subtotalPosition + 20;
    generateTableRow(
        doc,
        paidToDatePosition,
        "",
        "",
        "Paid To Date",
        "",
        formatCurrency(invoice.paid)
    );

    const duePosition = paidToDatePosition + 25;
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        duePosition,
        "",
        "",
        "Balance Due",
        "",
        formatCurrency(invoice.subtotal - invoice.paid)
    );
    doc.font("Helvetica");
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            780, { align: "center", width: 500 }
        );
}

function generateTableRow(
    doc,
    y,
    item,
    description,
    unitCost,
    quantity,
    lineTotal
) {
    doc
        .fontSize(10)
        .text(item, 50, y)
        .text(description, 150, y)
        .text(unitCost, 280, y, { width: 90, align: "right" })
        .text(quantity, 370, y, { width: 90, align: "right" })
        .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency(cents) {
    return "Rs " + (cents).toFixed(2);
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}



module.exports = {
    getSingleProduct: getSingleProduct,
    getAllProduct: getAllProduct,
    addProduct: addProduct,
    editProduct: editProduct,
    deleteProduct: deleteProduct,
    addPrescription,
    createInvoice
};