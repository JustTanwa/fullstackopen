import { useState } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import Content from './components/Content'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodCount = () => {
    setGood(good + 1);
  }
  const addNeutralCount = () => {
    setNeutral(neutral + 1);
  }
  const addBadCount = () => {
    setBad(bad + 1);
  }

  const content = {
    good,
    neutral,
    bad,
    all: good + neutral + bad
  }

  return (
    <>
      <Header title={"give feedback"}/>
      <Button text={"good"} handleClick={addGoodCount}/>
      <Button text={"neutral"} handleClick={addNeutralCount}/>
      <Button text={"bad"} handleClick={addBadCount}/>
      <Header title={"statistic"} />
      <Content content={content}/>
    </>
  )
}

export default App