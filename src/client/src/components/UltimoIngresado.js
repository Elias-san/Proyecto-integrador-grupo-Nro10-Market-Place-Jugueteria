import React, { Component } from 'react';

class UltimoIngresado extends Component {
    constructor(props){
        super(props);
            this.state = {
                ultimo:[],               
            }
        }

    
        componentDidMount(){
            fetch('http://localhost:3001/api/products/lastinput/?format=json')
                .then(response => response.json())
                .then(res => {
                    this.setState({
                        ultimo: res.data,
                    })
                 })
                .catch(error => console.log(error))
        }


        

    
    render (){
        let  ultimo = this.state;
        let server ='http://localhost:3001/images/productos/';
        console.log(ultimo);
        
        return (

            <React.Fragment>
                <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Ultimo producto ingresado</h6>
                        </div>
                        <div className="card-body">
                        
                                    <div>
                                        {
                                            this.state.ultimo.map((producto,indice)=>{
                                            return (  
                                            <div key={ indice }>
                                                <div className="text-center">
                                                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
                                                style={{width: "25rem"}} 
                                                src={ server + producto.url_imagen }
                                                alt="producto" />
                                                <p>{ producto.nombre }</p>
                                                </div> 
                                                
                                                <p>{ producto.descripcion } </p>
                                                     
                                            </div>
                                            )
                                            })
                                        }
                                    </div>
                            
                     
                        <a target="_blank" rel="nofollow" href="/">View product detail</a>
                        </div>
                    </div>
                </div>

            </React.Fragment>

        );

    }
    
    }

export default UltimoIngresado;