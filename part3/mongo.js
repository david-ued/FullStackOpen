const mongoose = require ('mongoose')

if (process.argv.length<3) {
   console.log('give password as argument')
   process.exit(1)
}

const password = process.argv[2]
const encodedPassword = encodeURIComponent(password)

const url = 
   `mongodb+srv://davidlin1727:${encodedPassword}@phonebook.zvdd1nn.mongodb.net/?retryWrites=true&w=majority&appName=phonebook
   `

//if there's 3 argument
if (process.argv.length == 3){

   mongoose.set('strictQuery',false)
   mongoose.connect(url)

   //create the schema and adding it as model
   const personSchema = new mongoose.Schema({
      name: String,
      number: String,
   })

   const Person = mongoose.model('Person', personSchema)

   //creating new object
   Person.find({}).then(result => {
      console.log('Phonebook')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })

}


//if there's 5 argument
if (process.argv.length == 5){

   mongoose.set('strictQuery',false)
   mongoose.connect(url)

   //create the schema and adding it as model
   const personSchema = new mongoose.Schema({
      name: String,
      number: String,
   })

   const Person = mongoose.model('Person', personSchema)

   //creating new object
   const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
   })


   person.save().then(result => {
      console.log(`Added ${person.name} ${person.number} to Phonebook`)
      mongoose.connection.close()
   })

}