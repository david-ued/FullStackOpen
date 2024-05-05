const Header = ({name}) => {

   return  (
     <div>
       <h1>{name}</h1>
     </div>
   )
 }
 
 const Part = ({part, exercises}) => {
 
   return  (
     <p key={part.id} >
       {part} {exercises}
     </p>
 
   )
 }
 
 const Content = ({parts}) => {
 
   return  (
     <div>
         {parts.map(part => 
           <Part key = {part.id} part = {part.name} exercises = {part.exercises} />
       )}
     </div>
 
   )
 }
 
 const Total = ({parts}) => {
 
   const sum = parts.reduce((sum, part) => {
     return sum + part.exercises
   }, 0)
 
   return  (
     <p>
       Number of exercises {sum}
     </p>
 
   )
 }
 
 const Course = ({course}) => {
   return (
   <div key= {course.id}>
     <Header name = {course.name} />
     <Content parts = {course.parts} />
     <Total parts = {course.parts} />
   </div>
   )
 }

 export default Course