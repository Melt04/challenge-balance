/** @format */
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar'
import BalanceContainer from './containers/BalanceContainer/BalanceContainer'
import BalanceContextProvider from './context/BalanceContextProvider'

function App() {
  return (
    <div className="App">
      <BalanceContextProvider>
        <NavBar />
        <BalanceContainer />
      </BalanceContextProvider>
    </div>
  )
}

export default App
