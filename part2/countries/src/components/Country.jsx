const Country = ({country}) => {
   const languageArray = Object.values(country.languages)

   return (
      <>
         <h2>{country.name.common}</h2>
         <div>{country.capital[0]}</div>
         <div>{country.area}</div>
         <h3>languages</h3>
         {languageArray.map (language => 
            <div key = {language}> {language}</div>
         )}
         <img src = {country.flags.png} alt={country.flags.alt}></img>
      </>
   )
 }
 
 export default Country