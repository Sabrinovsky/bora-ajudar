import React, { Component } from 'react'
import { BrowserRouter as Router,
         Route,
         Switch

} from 'react-router-dom' 

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Campaign from './components/Campaign'
import Admin from './components/admin/Admin'
import Login from './components/admin/Login'
import NotFound from './components/NotFound'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
         <Header />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/home' component={Home}/>
            <Route path='/home/2' component={Home}/>
            <Route path='/sobre' component={About}/>
            <Route path='/contato' component={Contact}/>
            <Route path='/campanhas' component={Campaign}/>
            <Route path='/admin' component={Admin}/>
            <Route exact path='/login' component={Login}/>
            <Route component={NotFound}/>
            </Switch>
            <Footer />
          </div>
      </Router>
    )
  }
}

export default App
