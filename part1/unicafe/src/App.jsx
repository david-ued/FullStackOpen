import { useState } from 'react'


const Button = ({handleClick, text}) => {
  return(
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const Statisticline = ({text, value}) => {
  return (
    <div>{text} : {value}</div>
  )
}

const Statistic = ({good, bad, neutral}) =>{

  const all = good + bad + neutral
  const average = ((good*1) + (bad*-1)) / all || 0
  const positive =  ((good / all)*100 || 0).toString() + ' %'

  if (all === 0) {
    return (
      <>
        <div>No feedback Given</div>
      </>
    )
  }
  {
    return(
      <>
          < Statisticline text = "good" value = {good} />
          < Statisticline text = "neutral" value = {neutral} />
          < Statisticline text = "bad" value = {bad} />
          < Statisticline text = "all" value = {all} />
          < Statisticline text = "average" value = {average} />
          < Statisticline text = "positive" value = {positive} />
      </>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick= {() => setGood(good +1)} text = 'good'/>
      <Button handleClick= {() => setNeutral(neutral +1)} text = 'neutral'/>
      <Button handleClick= {() => setBad(bad +1)} text = 'bad'/>
      <h1>statistics</h1>
      <Statistic good = {good} neutral = {neutral} bad = {bad}  />


    </div>
  )
}

export default App