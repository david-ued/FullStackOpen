import Person from './Person'

const Persons = ({persons, removePerson}) => {

   return (
      <>
         <ul>
            {persons.map (person =>
            <Person key={person.name} id={person.id} name={person.name} number={person.number} removePerson = {removePerson} />
            )}
         </ul>
      </>
   )
 }
 
 export default Persons