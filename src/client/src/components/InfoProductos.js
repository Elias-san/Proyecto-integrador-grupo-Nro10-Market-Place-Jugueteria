import React, { Component }  from 'react';
import StockTotal from './StockTotal';
import ImporteTotal from './ImporteTotal';


class InfoProductos extends Component {
    constructor(props){
        super(props);
            this.state = {
              totales:[],
               
            }
        }

        componentDidMount(){
            fetch('http://localhost:3001/api/products/?format=json')
                .then(response => response.json())
                .then(res => {
                    this.setState({
                        totales: res.totales
                    })
                    
                 })
                .catch(error => console.log(error))
        }

    
    render (){
        
        let totales = this.state;
        console.log(totales);
       
        return (
            <React.Fragment>
            {
                this.state.totales.map((total,indice)=>{
                    return (
                        <div key={ indice }>
                        <StockTotal 
                            title="Stock total de productos"
                            value ={ total.total_stock }
                            icon="fa-clipboard-list"
                            border="border-left-primary"
                            />

                            <ImporteTotal 
                            title="Costo total de stock"
                            value ={ total.valor_total}
                            />
                        </div>
                    )
                })
            }
            
            
               
            </React.Fragment>

        );

    }
    
    }

export default InfoProductos;