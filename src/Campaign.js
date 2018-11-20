import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import base from './Base'
import axios from 'axios'

class Campaign extends Component {
    constructor(props){
        super(props)
        this.state = {
            campaigns : {},
            redirectDonate: {}
        }
    }
    componentDidMount(){
        base.syncState('campaigns', {
            context: this,
            state: 'campaigns',
            asArray: false
        })
    }
    handleDonate(key){
        const url = 'https://us-central1-bora-ajudar-73ebc.cloudfunctions.net/api/donate'
        const dados = {teste : 'oi'} 
        const options = {
            method: 'POST',
            headers: {'Access-Control-Allow-Origin' : '*'},
            data : dados,
            url
        }
        axios(options)
        .then(data=>{
            console.log(data)
        })
        .catch(err =>{
            console.log(err)
        })
    }
    renderCampaign(key, campaign){
         return(
            <section className='page-section' key={key} >
            <div className='container'>
                <div className='product-item bg-faded'>
                <div className='product-item-title d-flex'>
                    <div className='p-5 d-flex mr-auto rounded'>
                    <h2 className='section-heading mb-0'>
                        <span className='section-heading-upper'>{campaign.sub}</span>
                        <span className='section-heading-lower'>{campaign.nome}</span>
                    </h2>
                    </div>
                </div>
                <div className='product-item-description d-flex ml-auto'>
                    <div className='p-5 rounded'>
                        <p className='mb-0'>{campaign.texto}</p>

                        { campaign.tipo === 'doacao' && 
                        <div>
                            <div className='progress'>
                                <div className='progress-bar bg-success' role='progressbar' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
                            </div>
                            <p>Meta: R$ {campaign.meta} / Atingidos: R$ {campaign.arrecadado}</p>
                            <div>
                                <button className='btn btn-success' onClick={()=>this.handleDonate(key)}>Contribuir</button>
                            </div>
                        </div>}
                        { campaign.tipo === 'produtos' &&
                        <div>
                            <br/>
                            <h4>Para doar, entre em contato:</h4>
                            <p>{campaign.contato}</p>
                        </div>
                        }
                    </div> 
                </div>
                <div className='ml-auto'>
                    
                </div>
                </div>
            </div>
        </section>
         )
    }

    render() {

        return (
            <div>
                <section className='page-section'>
                    <div className='container'>
                        <div className='product-item'>
                        <div className='product-item-title d-flex'>
                            <div className='bg-faded p-5 d-flex ml-auto rounded'>
                            <h2 className='section-heading mb-0'>
                                <span className='section-heading-upper'>Ajude-nos por nossas</span>
                                <span className='section-heading-lower'>Campanhas</span>
                            </h2>
                            </div>
                        </div>
                        <img className='product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0' src='img/products-01-menor.jpg' alt=''/>
                        <div className='product-item-description d-flex mr-auto'>
                            <div className='bg-faded p-5 rounded'>
                            <p className='mb-0'>We take pride in our work, and it shows. Every time you order a beverage from us, we guarantee that it will be an experience worth having. Whether it's our world famous Venezuelan Cappuccino, a refreshing iced herbal tea, or something as simple as a cup of speciality sourced black coffee, you will be coming back for more.</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                { Object
                    .keys(this.state.campaigns)
                    .map(key =>  this.renderCampaign(key, this.state.campaigns[key]))}
                
            </div>
        )
    }
}
export default Campaign