import React, { Component} from 'react'
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom'

import { auth } from '../../Base'
import AdminCampaign from './AdminCampaign'


const AdminHome = props => <p>Bem vindo</p>

class Admin extends Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthing: true,
            isLoggedIn:false,
            user: null
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user =>{
            this.setState({
                isAuthing : false,
                isLoggedIn: !!user,
                user: user
            })
        })
    }
    render(){
        if(this.state.isAuthing){
            return <p>Aguarde...</p>
        }
        if(!this.state.isLoggedIn){
            return <Redirect to='/login'></Redirect>
        }
        return(
            //<Router>
                <div>
                    <h1>Painel adminstrador</h1>
                    <Route exact path='/admin' component={AdminHome}/> 
                    <Route
                        path={this.props.match.url+'/campanhas'}        
                        component={ AdminCampaign }
                    />
                    
                </div>
            //</Router>
        )
    }
}

export default Admin