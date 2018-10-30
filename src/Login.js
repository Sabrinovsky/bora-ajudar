import React, {Component} from 'react'
import { auth } from './Base'
import { Redirect } from 'react-router-dom'

class Login extends Component{
    constructor(props){
        super(props)

        this.email = null
        this.passwd = null

        this.state = {
            isLoggedIn : false,
            error : false,
            isLogging : false
        }
     
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin(){

        this.setState({
            isLogging: true,
            error: false
        })

        auth
        .signInWithEmailAndPassword(this.email.value,this.passwd.value)
        .then((user) =>{
            this.setState({
                isLoggedIn: true
            })
        })
        .catch(error =>{
            this.setState({
                error: true,
                isLogging: false
            })
        })
    }

    render(){
        if(this.state.isLoggedIn){
            return <Redirect to='/admin'></Redirect>
        }
        return (
            <div>
                <input type='email' ref={ref => this.email = ref} />
                <input type='passwd' ref={ref => this.passwd = ref} />
                <button disabled={this.state.isLogging} onClick={this.handleLogin}>
                    Logar
                </button>
                {this.state.error && <p>E-mail ou senha inválidos</p>}
            </div>
        )
    }
}
export default Login