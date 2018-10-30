import React, { Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { auth } from './Base'
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
            <div>            
                <h1>Painel adminstrador</h1>
                {console.log(this.props.match.url)}
                <Router>
                <>
                    <Route path='/' component={AdminHome}>   
                        <Route 
                            path="/admin/campanhas" component={ AdminCampaign } 
                        />
                    </Route>
                </>
                </Router>
               
            </div>
        )
    }
}

export default Admin