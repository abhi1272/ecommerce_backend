const appConfig = require("./../../config/appConfig");
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
const fs = require('fs')

module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}`;
  
  const invoice = {
    shipping: {
      name: "John Doe",
      address: "1234 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "US",
      postal_code: 94111,
    },
    items: [
      {
        item: "TC 100",
        description: "Toner Cartridge",
        quantity: 2,
        amount: 6000,
      },
      {
        item: "USB_EXT",
        description: "USB Cable Extender",
        quantity: 1,
        amount: 2000,
      },
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234,
  };
  app.get("/", (req, res) => {});


  const createInvoice = (req,res) => {
    let doc = new PDFDocument({ margin: 50 });

    generateHeaders(doc);
    generate(doc, invoice);
    generateTable(doc, invoice);
    generateFooter(doc);
    doc.pipe(res)
    // pipe the document to a blob
    const stream = doc.pipe(blobStream());

    // add your content to the document here, as usual

    // get a blob when you're done
    doc.end();
    stream.on('finish', function() {
      // get a blob you can do whatever you like with
      const blob = stream.toBlob('application/pdf');

      // or get a blob URL for display in the browser
      const url = stream.toBlobURL('application/pdf');
      iframe.src = url;
    });
    // doc.pipe(fs.createWriteStream("text.pdf"));
 
    //   cloudinary.uploader.upload("text.pdf",function(res,err){console.log(res,err)});
  }

  function generateHeaders(doc) {
    const billingAddress = {
        name:'Abhishek',
        address:'address',
        city:'Pune',
        state:'Mah',
        country:'India',
        postalCode:845557
    }

    doc
        // .image('../../invoice/logo.png', 0, 0, { width: 250})
        .fillColor('#000')
        .fontSize(20)
        .text('INVOICE', 275, 50, {align: 'right'})
        .fontSize(10)
        .text(`Invoice Number: 1234`, {align: 'right'})
        .text(`Due: 12.09.2020`, {align: 'right'})
        .text(`Balance Due: $${22 - 11}`, {align: 'right'})
        .moveDown()
        .text(`Billing Address:\n ${billingAddress.name}\n${billingAddress.address}\n${billingAddress.city}\n${billingAddress.state},${billingAddress.country}, ${billingAddress.postalCode}`, {align: 'right'})

    const beginningOfPage = 50
    const endOfPage = 550

    doc.moveTo(beginningOfPage,200)
        .lineTo(endOfPage,200)
        .stroke()
            
    doc.text(`Memo: 'yes'}`, 50, 210)

    doc.moveTo(beginningOfPage,250)
        .lineTo(endOfPage,250)
        .stroke()

}


  function generateTable(doc, invoice) {
    const tableTop = 270
    const itemCodeX = 50
    const descriptionX = 100
    const quantityX = 250
    const priceX = 400
    const amountX = 350

    doc
        .fontSize(10)
        .text('Item Code', itemCodeX, tableTop, {bold: true})
        .text('Description', descriptionX, tableTop)
        .text('Quantity', quantityX, tableTop)
        .text('Price', priceX, tableTop)
        .text('Amount', amountX, tableTop)

    const items = invoice.items
    let i = 0


    for (i = 0; i < items.length; i++) {
        const item = items[i]
        const y = tableTop + 25 + (i * 25)

        doc
            .fontSize(10)
            .text(item.itemCode, itemCodeX, y)
            .text(item.description, descriptionX, y)
            .text(item.quantity, quantityX, y)
            .text(`$ 12`, priceX, y)
            .text(`$ 100`, amountX, y)
    }
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(`Payment due upon receipt. `, 50, 700, {
            align: 'center'
        })
}

function generate(doc, invoice) {
    let theOutput = new PDFDocument 

    console.log(invoice)

    const fileName = `Invoice 1234.pdf`

    // pipe to a writable stream which would save the result into the same directory
    theOutput.pipe(fs.createWriteStream(fileName))

    generateHeaders(theOutput)

    theOutput.moveDown()

    generateTable(theOutput,invoice)

    generateFooter(theOutput)
    

    // write out file
    theOutput.end()

}

  app.get(baseUrl + "/", createInvoice)

};
