const express = require('express')
const uuid = require('uuid')
const port = 3001
const app = express()
app.use(express.json())


// Middleware => INTERCEPTADOR => tem o poder de parar ou alterar dados da requisição


const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params
    
    const index = users.findIndex( user => user.id === id)

    if(index < 0) {
        return response.status(404).json( {error: 'User not found'} )
    }

    request.userIndex = index
    request.userId = id

    next()
} 

app.get('/user/', (request, response) => {

    return response.json(users)
})

app.post('/user', (request, response) => {

    const {name, age} = request.body

    const user = {id: uuid.v4(), name: name, age: age}

    users.push(user)

    return response.status(201).json(user) 
})

app.put('/user/:id', checkUserId, (request, response) => {
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId 

    const updatedUser = {id, name, age}

    users[index] = updatedUser

 
    return response.json(updatedUser)
})

app.delete('/user/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)


    return response.status(204).json(users)
})















app.listen(port, () => {
    console.log(`😎 Server started on port ${port}`)
})