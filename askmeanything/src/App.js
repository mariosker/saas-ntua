import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Page404 from './components/404'

const Login = () => {
  return <p>Login</p>
}

const SignUp = () => {
  return <p>SignUp</p>
}

function App () {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route component={Page404} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
