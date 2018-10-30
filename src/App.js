import React, { Component } from 'react'
import { BrowserRouter as Router,
         Route
} from 'react-router-dom' 

import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Campaign from './Campaign'
import Admin from './Admin'
import Login from './Login'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={Home}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/home/2' component={Home}/>
          <Route exact path='/sobre' component={About}/>
          <Route exact path='/contato' component={Contact}/>
          <Route exact path='/campanhas' component={Campaign}/>
          <Route exact path='/admin' component={Admin}/>
          <Route exact path='/login' component={Login}/>
          <Footer />

        </div>
      </Router>
    )
  }
}

export default App
