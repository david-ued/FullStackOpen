import { useState, useEffect } from 'react'
import weatherService from './services/weather'
import CountriesList from './components/CountriesList'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState (null)
  const [searchTerm, setSearchTerm] = useState('')


  useEffect (() => {
    weatherService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
    }, [])

  const filteredCountries = countries? countries.filter(country => country.name.common.toLowerCase().includes(searchTerm) ): []

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  if (!countries) { 
    return null 
  }

  return (
    <>
    <h1>Country look up</h1>
    < Filter input={searchTerm} handleInput = {handleSearchTerm} />
    < CountriesList countries={filteredCountries} />
    </>
  )
}

export default App
