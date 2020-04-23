import React, { Component } from 'react';


class Categories extends Component{
    constructor(props){
        super(props);
            this.state = {
                categories:[]
            }
    }

    componentDidMount(){
        fetch('http://localhost:3001/api/products/categories/?format=json')
            .then(response => response.json())
            .then(res => {
                // Setear el estado y cambiar spinner cargando
                this.setState({
                    categories: res.data,
                                       
                })
             })
            .catch(error => console.log(error))
    }

render (){
    return (
        <div className="col-lg-6 mb-4">           
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Categorias de producto</h6>
          </div>
          <div className="card-body">
            <div className="row">
                { 
                this.state.categories.map((oneCat,index)=>(
                    <div className="col-lg-6 mb-4">
                        <div className="card bg-info text-white shadow">
                            <div className="card-body">
                                { oneCat.nombre}
                            </div>
                        </div>
                    </div>
                ))
                }
              
            </div>
          </div>
        </div>
      </div>
      
    );
}
}
export default Categories;