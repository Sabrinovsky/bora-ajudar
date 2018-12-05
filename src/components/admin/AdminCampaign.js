import React, { Component }  from 'react'

import base from '../../Base'

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
        this.handleAtt = this.handleAtt.bind(this)
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
                this.contato.value = this.state.campaigns[key].contato
                this.tipoP.setAttribute('checked',true)
            }
            if(this.state.tipo ==='doacao'){
                this.tipoD.setAttribute('checked',true)
                this.meta.value = this.state.campaigns[key].meta
                this.arrecadado.value = this.state.campaigns[key].arrecadado
                
            }            
        })

        this.saveBtn.setAttribute('hidden',true)
        this.editBtn.removeAttribute('hidden',true)
        this.setState({updatekey: key})


        
    }

    handleAtt(key){
        
        this.removeCampaign(this.state.updatekey)
        this.handleSave()
        this.saveBtn.removeAttribute('hidden',true)
        this.editBtn.setAttribute('hidden',true)
        
    }

    renderCampaign(key, campaign){
        return(
            <tr key={key}>
                <td>{campaign.nome}
                    &nbsp; </td>
                <td><button className='btn btn-secondary' onClick={()=>this.handleEdit(key)}>Editar</button> </td>
                <td><button className='btn btn-dark' onClick={()=> this.removeCampaign(key)}>Remover</button> </td>
            </tr>
        )
    }
    
    render(){
        return(
            <section className='page-section'>
                <div className='container'>
                    <div className='product-item bg-faded admin-campaign'>
                    <h2>Nova campanha</h2>
                        <div>
                            <form>
                                <div className='form-group'>
                                    <label> Campanha</label>
                                    <input className='form-control' type='text' ref={ref => this.nome = ref} />
                                </div>

                                <div className='form-group'>
                                    <label>Descrição</label>
                                    <textarea className='form-control' ref={ref => this.texto = ref} ></textarea>
                                </div>

                                <div className='form-group'>
                                    <label>Sub-título</label>
                                    <input className='form-control' type='text' ref={ref => this.sub = ref} />
                                </div>

                                <div className='form-check'>
                                    <input type='radio' className='form-check-input'  id='doacao' name='tipo' onClick={()=> this.setState({tipo:'doacao'})} ref={ref => this.tipoD = ref} />
                                    <label for='doacao' className='form-check-label' >Doação </label>
                                </div>

                                <div className='form-check'>
                                    <input type='radio' className='form-check-input' id='produtos' name='tipo' onClick={()=> this.setState({tipo:'produtos'})} ref={ref => this.tipoP = ref} />
                                    <label for='produtos' className='form-check-label'>Produtos </label>
                                </div>
                                <br />
                                {this.state.tipo === 'doacao' && <>
                                   
                                <div className='form-group'>
                                    <label>Meta</label>
                                    <input type='text' className='form-control' ref={ref => this.meta = ref} />
                                </div>
                                <div className='form-group'>
                                    <label>Arrecadado</label>
                                    <input type='text' className='form-control' defaultValue='0' ref={ref => this.arrecadado = ref} />
                                </div>
                                </>}
                                {this.state.tipo === 'produtos' && <>
                                   
                                    <div className='form-group'>
                                        <label>Como doar: </label>
                                        <input type='text' className='form-control' ref={ref => this.contato = ref} />

                                    </div>
                                </>}

                                <button className='btn btn-secondary' onClick={()=>this.handleSave()} ref={ref =>this.saveBtn = ref} >Salvar campanha</button>
                                <button className='btn btn-secondary' onClick={()=>this.handleAtt()} hidden={true} ref={ref =>this.editBtn = ref} >Atualizar campanha</button>
                                
                            </form>
                        </div>
                        <hr/>
                        <table>
                            <tr>
                                <th>Nome</th>
                            </tr>
                           
                            { Object
                                .keys(this.state.campaigns)
                                .map(key => this.renderCampaign(key, this.state.campaigns[key])) }
                        
                        </table>
                    </div>
                </div>
            </section>
        )
    }
}
export default AdminCampaign