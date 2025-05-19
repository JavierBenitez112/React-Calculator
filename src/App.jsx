import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Functions from './logic/Functions'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Functions />
    </div>
  )
}

export default App
