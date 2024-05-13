const Notification = ({message, status}) => {
   const className = `message ${status}`

   if(message === null) {
      return null
   }

   return (
      <div className ={className}>
         {message}
      </div>
   )
 }
 
export default Notification