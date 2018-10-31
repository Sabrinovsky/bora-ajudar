import React, { Component }  from 'react'

import base from './Base'

class AdminCampaign extends Component{
    constructor(props){
        super(props)
        this.state = {
            campaigns : {}
        }

        this.renderCampaign = this.renderCampaign.bind(this)
        this.removeCampaign = this.removeCampaign.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }
    componentDidMount(){
        base.syncState('campaigns', {
            context: this,
            state: 'campaigns',
            asArray: false
        })
    }
    removeCampaign(key){
        // const { [key]: undefined, ...newCampaigns } = this.state.campaigns
        // this.setState({
        //     campaigns : newCampaigns
        // })
        
        base.remove('campaigns/'+key, err =>{
            console.log(err)
        })
    }
    handleSave(){
        console.log(this.nome)
        // const nome = this.nome.value
        // const texto = this.texto.value
        // const sub = this.sub.value
        // const contato = this.contato.value
        // const tipo = this.tipo.value

        // base.push('campaigns',{
        //     data:{nome,texto,sub,contato,tipo},
        // }, 
        //     err =>{
        //     console.log(err)
        // })
    }
    renderCampaign(key, campaign){
        return(
            <li key={key}>
                {campaign.nome}
                &nbsp;
                <button onClick={()=>1}>Editar</button>
                <button onClick={()=> this.removeCampaign(key)}>Remover</button>
            </li>
        )
    }
    
    render(){
        return(
            <div className='card'>
                <h1>Campanhas admin</h1>
                <h2>Nova campanha</h2>
                 
                Campanha: <input type='text' ref={ref => this.nome = ref} /><br />
                Descrição: <textarea  ref={ref => this.texto = ref} ></textarea><br />
                Sub-título: <input type='text' ref={ref => this.sub = ref} /><br />
                Sub-título: <input type='text' ref={ref => this.contato = ref} /><br />
                Tipo: <input type='text' ref={ref => this.tipo = ref} /><br />
                <button onClick={this.handleSave()}>Salvar nova campanha</button>
                <ul>
                    { Object
                        .keys(this.state.campaigns)
                        .map(key => this.renderCampaign(key, this.state.campaigns[key])) }
                </ul>
            </div>
        )
    }
}
export default AdminCampaign