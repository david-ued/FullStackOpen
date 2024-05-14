import Country from "./Country"

const CountriesList = ({countries}) => {
   if (countries.length > 10) {
      return (
         <>
         <div>Too many matchesm specify another filter</div>
         </>
      )
    } else if (countries.length == 1)  {
      return (
         <>
            <Country country = {countries[0]} />
         </>
      )
 
   } else {
      return (
         <>
            <ul>
               {countries.map (country =>
               <li key={country.name.common}> {country.name.common} </li>
               )}
            </ul>
         </>
      )
   }
 }
 
 export default CountriesList