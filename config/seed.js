const faker = require('faker');
const shortid = require('shortid');
const fs = require('fs');


let currentModel = process.argv[2];

let createData = (model) => {
    let users = loadUsers();
    users.push(model);
    saveUsers(users);
};

let saveUsers = (users) => {
    let saveUser = JSON.stringify(users);
    fs.writeFileSync(`${currentModel}.json`, saveUser);
};

let loadUsers = () => {
    try {
        let dataBuffer = fs.readFileSync(`${currentModel}.json`);
        let dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
};


if (currentModel === 'User') {
    let USerModel = ({
        userId: shortid.generate(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        mobileNumber: faker.phone.phoneNumber()
    });
    createData(USerModel);
} else if (currentModel === 'Customer') {
    let customerModel = ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: {
            street: faker.address.streetName(),
            place: faker.address.city(),
            pincode: faker.address.zipCode(),
        },
        password: faker.internet.password(),
        email: faker.internet.email(),
        mobileNumber: faker.phone.phoneNumber()
    });
    createData(customerModel);
} else if (currentModel === 'Product') {
    let productModel = ({
        productName: faker.commerce.productName(),
        company: faker.commerce.department(),
        batchNo: shortid.generate(),
        MRP: faker.commerce.price(),
        Rate: faker.commerce.price()
    });
    createData(productModel);
}
