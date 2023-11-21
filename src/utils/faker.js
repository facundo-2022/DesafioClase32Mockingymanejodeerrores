const { faker } = require ("@faker-js/faker")

//aca le damos al farker para que me cree lo user con el siguiente formato
const generateUser = () => {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        gender: faker.person.gender(),
        email: faker.internet.email(),
        job: faker.person.jobTitle(),
        id:null
    }
}
//aca le damos al farker para que me cree lo products con el siguiente formato
const generateProduct = () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 1, max: 1000, dec: 0 }),
        id:null
    }
}

module.exports = { generateUser, generateProduct }