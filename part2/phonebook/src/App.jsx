import {useState, useEffect} from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => { 
  const [persons, setPersons] = useState ( [ // using mock data
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)



  useEffect (() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    const duplicatedPerson = persons.find( person => JSON.stringify(person.name) === JSON.stringify(newName))

    if (duplicatedPerson){
      //implement the
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
       
        const changedPerson = {...duplicatedPerson, number:newNumber}
        personService
          .updatePerson(changedPerson.id, changedPerson)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.id !== changedPerson.id ?person: returnedPerson) )
          })
      }
    } else {

      //then add it to the server
      personService
        .createPerson(newPersonObject)
        .then(returnedPerson => {
          //finally update the front-end
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(()=>{
            setSuccessMessage(null)
          }, 2000)
          setPersons(persons.concat(returnedPerson))
        })
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)){
      personService
      .deletePerson(id)
      .then(returnedPerson =>{
        setPersons(persons.filter(person => person.id != returnedPerson.id ))
      })    
    }
  }

  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
 }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm) )

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={successMessage} status ='success'/>
        <Filter input={searchTerm} handleInput = {handleSearchTerm} />
      <h3>Add a new person</h3>
        <PersonForm 
          handleSubmit={addPerson}
          handleNameChange = {handleNameChange}
          handleNumberChange = {handleNumberChange}
        />
      <h3>Numbers</h3>
        <Persons 
          persons= {filteredPersons}
          removePerson = {removePerson}
        />
    </div>
  )
}

export default App