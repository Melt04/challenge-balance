/** @format */

import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar'
import BalanceContainer from './containers/BalanceContainer/BalanceContainer'
import BalanceContextProvider from './context/BalanceContextProvider'

import NotFound from './components/NotFound/NotFound'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BalanceContextProvider>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <BalanceContainer />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </BalanceContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
