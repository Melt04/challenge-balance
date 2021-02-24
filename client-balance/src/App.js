/** @format */

import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar'
import BalanceContainer from './containers/BalanceContainer/BalanceContainer'
import BalanceContextProvider from './context/BalanceContextProvider'

import Login from './components/login/Login'

import NotFound from './components/NotFound/NotFound'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useUserContext } from './context/UserContextProvider'
import OperationContainer from './containers/OperationContainer/OperationContainer'
import OperationEditContainer from './containers/OperationEditContainer/OperationEditContainer'
import CategoryContainer from './containers/CategoryContainer/CategoryContainer'

function App() {
  const { isLoggedIn } = useUserContext()

  return (
    <div className="App">
      <BrowserRouter>
        <BalanceContextProvider>
          <NavBar />
          {!isLoggedIn ? (
            <>
              <Login />
            </>
          ) : (
            <Switch>
              <Route exact path="/">
                <BalanceContainer />
              </Route>
              <Route exact path="/form">
                <OperationContainer />
              </Route>
              <Route exact path="/edit/:id">
                <OperationEditContainer />
              </Route>
              <Route exact path="/category">
                <CategoryContainer />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          )}
        </BalanceContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
