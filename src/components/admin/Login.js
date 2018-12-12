import React, {Component} from 'react'
import { auth } from '../../Base'
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
            window.location = '/admin/campanhas'
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
                <div className='modal-dialog text-center'  >
                    <div className='main-section'>
                        <div className='modal-content admin-campaign bg-faded'>
                            <form>
                                    <div className='form-group'>
                                        <label for='email '>E-mail</label>
                                        <input id='email' className='form-control' type='email' required ref={ref => this.email = ref} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Senha</label>
                                        <input type='password' className='form-control' required ref={ref => this.passwd = ref} />
                                    </div>
                                <button className='btn' disabled={this.state.isLogging} onClick={this.handleLogin}>
                                Entrar
                                </button>
                                {this.state.error && <p>E-mail ou senha inválidos</p>}
                            </form>
                        </div>
                    </div>
            </div>
        )
    }
}
export default Login