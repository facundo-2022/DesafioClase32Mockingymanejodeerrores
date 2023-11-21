const { generateUser } = require ("../../utils/faker.js")
const UserDTO = require ("../dtos/userDTOS.js")
const CustomError = require ("../../errors/CustomError.js")
const { EErrors }= require ("../../errors/enums.js")
const { generateUserErrorInfo } = require ("../../errors/Info/infoUser.js")

const users = []

//con el for am medida quye ingresen los usuario se va a ir pusheando en la url.
//codigo para consultar los user creado con el farker y creamos solamente 15 user
getUsers = async (req, res) => {
    for (let i = 0; i < 15; i++) {
        const newUser = generateUser()
        newUser.id = i+1
        users.push(newUser)
    }
    //aca que me muestra los user a travez de payload
    res.send({ status: "success", payload: users })
}

//creamos el usuario 
createUser = async (req, res) => { 
    const { first_name, last_name, gender, email, job } = req.body;
    if (!first_name || !last_name || !gender || !email || !job) {
        CustomError.createError({
            name:"Error al crear usuario",
            cause:generateUserErrorInfo({first_name, last_name, gender, email, job}),
            message:"Error al crear usuario",
            code:EErrors.INVALID_TYPES_ERROR// nos muestra el code de error que lo colocamos en enums.js
        })
    }

    // exportamos desde UserDTO el formato
    const user = new UserDTO ({
        first_name,
        last_name,
        gender,
        email,
        job
    })
    if (users.length===0){
        user.id = 1
    } else {
        user.id = users[users.length-1].id+1
    }
    users.push(user)
    res.send({ result: "success", payload: users })
}

module.exports = { getUsers, createUser }