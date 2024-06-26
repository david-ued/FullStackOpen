//add mongoose

//add express and middleware
require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/note')


const morgan = require('morgan')
const cors = require('cors')


app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

//mock data
let persons = [
      { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

//server function
app.get('/', (request, response) => {
  response.send('<h1>Hello World!!!!</h1>')
})


app.get('/api/persons', (request, response) => {
   Person.find({}).then( persons => {
      response.json(persons)
   })
 })


app.get(`/api/persons/:id`, (request, response, next) => {
   Person.findById(request.params.id).then(person => {
      response.json(person)
   })
})

app.get(`/info`, (request, response) => {
   const number = persons.length
   const date = new Date(Date.now()).toString()
   const info = `<p>Phonebook has info for ${number} People</p><br/><p>${date}</p>`
   response.send(info)
 })


app.post(`/api/persons`, (request, response, next) => {
   const body = request.body

   //check if either of the field is empty
   if(!body.name || !body.number ) {
      return response.status(400).json({
         error: 'either name or number is mising'
      })
   }

   //check if the name is not unique
   const personExisted = persons.find( person => JSON.stringify(person.name) === JSON.stringify(body.name)) 
   
   if(personExisted) {
      return response.status(400).json({
         error: 'name must be unique'
      })
   }
   
   const randomId = Math.floor(Math.random()*10000000000)

   const person = new Person({
      id: randomId,
      name: body.name,
      number: body.number,
   })

   //persons = persons.concat(person)
   person.save().then(savedPerson => {
      response.json(person)
      })
      .catch(error => next(error))
})


app.put(`/api/persons/:id`, (request, response, next) => {
   const {name, number} = request.body
   
   Person.findByIdAndUpdate(request.params.id, {name, number}, {new:true, runValidators: true, context: 'query'})
      .then(updatedPerson => {
         response.json(updatedPerson)
      })
      .catch(error => next(error))
})


 app.delete(`/api/persons/:id`, (request, response) => {
   const id = Number(request.params.id)
   Person.findByIdAndDelete(request.params.id)
   .then(result => {
      persons = persons.filter(person => person.id !== id)
      response.status(204).end()
   })
 })

 
// first handler of requests with unknown endpoint
 const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' })
 }
 
 app.use(unknownEndpoint)


 // then error handler
 const errorHandler = (error, request, response, next) => {
   console.error(error.message)
 
   if (error.name === 'CastError') {
     return response.status(400).send({ error: 'malformatted id' })
   } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
 
   next(error)
 }

 app.use(errorHandler)

// connect to the port
 const PORT = process.env.PORT || 3001
 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
 }) 