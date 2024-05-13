const Person = ({id, name, number, removePerson}) => {

   return (
      <>
         <li>
             {name} {number}  
             <button onClick = {() =>removePerson(id, name)}>delete</button>
         </li>
      </>
   )
 }
 
 export default Person