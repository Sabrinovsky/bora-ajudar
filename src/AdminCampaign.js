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
        this.handleEdit = this.handleEdit.bind(this)
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
        
        // console.log(this.nome.value)
        const nome = this.nome.value
        const texto = this.texto.value
        const sub = this.sub.value
        const tipo = this.state.tipo
        
        const contato = this.state.tipo === 'produtos' ? this.contato.value : null
        const arrecadado = this.state.tipo === 'doacao' ? this.arrecadado.value : null 
        const meta = this.state.tipo === 'doacao' ? this.meta.value : null

        base.push('campaigns',{
            data:{nome,texto,sub,contato,tipo,meta,arrecadado},
            then: err =>{
                if(!err){
                    this.nome.value = ''
                    this.texto.value = ''
                    this.sub.value = ''
                    if(tipo==='doacao'){
                        this.arrecadado.value = '' 
                        this.meta.value = ''
                    }else{
                        this.contato.value = ''
                    }
                    this.setState({tipo:''})
                    

                }
            }, 
        })

    }

    handleEdit(key){
        
        this.nome.value = this.state.campaigns[key].nome;
        this.texto.value = this.state.campaigns[key].texto;
        this.sub.value = this.state.campaigns[key].sub;

        this.setState({tipo: this.state.campaigns[key].tipo},()=>{

            if(this.state.tipo === 'produtos'){
                this.contato.value = this.state.campaigns[key].nome
                
            }            
        }) 

        // this.update()

    }

    update(){
        console.log(this.state.tipo)
    }

    renderCampaign(key, campaign){
        return(
            <li key={key}>
                {campaign.nome}
                &nbsp;
                <button onClick={()=>this.handleEdit(key)}>Editar</button>
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
                <div>
                <input type='radio' id='doacao' name='tipo' onClick={()=> this.setState({tipo:'doacao'})} ref={ref => this.tipo = ref} />Doação<br />
                <input type='radio' id='produtos' name='tipo' onClick={()=> this.setState({tipo:'produtos'})} ref={ref => this.tipo = ref} />Produtos
                </div>
                {this.state.tipo === 'doacao' && <div>
                    <h4>Doação</h4>
                    Meta: <input type='text' ref={ref => this.meta = ref} /><br />
                    Arrecadado: <input type='text' defaultValue='0' ref={ref => this.arrecadado = ref} /><br />
                </div>}
                {this.state.tipo === 'produtos' && <div>
                    <h4>Produtos</h4>
                    Como doar: <input type='text' ref={ref => this.contato = ref} /><br />
                </div>}

                <button onClick={()=>this.handleSave()}>Salvar</button>

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