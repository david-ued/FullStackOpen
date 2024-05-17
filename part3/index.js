const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


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
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, response) => {
   response.json(persons)
 })

app.get(`/api/persons/:id`, (request, response) => {
const id = Number(request.params.id)
const person = persons.find(person => person.id === id)

if(person){
   response.json(person)
}else {
   response.status(404).end()
}
})


app.post(`/api/persons`, (request, response) => {
   const body = request.body

   //check if either of the field is empty
   if(!body.name || !body.number ) {
      return response.status(400).json({
         error: 'either name or numbe is mising'
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

   const person = {
      id: randomId,
      name: body.name,
      number: body.number,
   }

   persons = persons.concat(person)

   response.json(person)
})


 app.get(`/info`, (request, response) => {
   const number = persons.length
   const date = new Date(Date.now()).toString()
   const info = `<p>Phonebook has info for ${number} People</p><br/><p>${date}</p>`
   response.send(info)
 })

 app.delete(`/api/persons/:id`, (request, response) => {
   const id = Number(request.params.id)
   persons = persons.filter(person => person.id !== id)

   response.status(204).end()
 })


 const PORT = process.env.PORT || 3001
 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
 })