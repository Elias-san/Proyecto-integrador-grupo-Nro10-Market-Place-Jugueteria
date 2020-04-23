import React, { Component } from 'react';
import TotalUsuarios from './TotalUsuarios';

class ListadoUsuarios extends Component {
    constructor(props){
        super(props);
            this.state = {
                titulo: 'Listado usuarios',
                usuarios:[],
                loading:true,
               
            }
        }

    
        componentDidMount(){
            fetch('http://localhost:3001/api/users/?format=json')
                .then(response => response.json())
                .then(res => {
                    // Setear el estado y cambiar spinner cargando
                    this.setState({
                        usuarios: res.data,
                        loading:false,
                        
                    })
                 })
                .catch(error => console.log(error))
        }


        

    
    render (){
        let { titulo, usuarios,loading } = this.state;
        console.log(usuarios);
        return (

            <React.Fragment>
                <TotalUsuarios 
                title="Usuarios registrados"
                value ={usuarios.length}
                 />
            
            {
                loading
                ?
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                :
                // Cuando termina de cargar y recibio los datos
                // cargo la tabla, y el spinner loading : false
                <React.Fragment>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Usuario</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((unUsuario,indice)=>{
                            return (  
                            <tr key={ indice }>
                                <th scope="row">{ indice + 1}</th>
                                <td>{ unUsuario.nombre }</td>
                                <td>{ unUsuario.apellido }</td>  
                                <td>{ unUsuario.usuario }</td>                             
                            </tr>
                            )
                            })
                        }
                   
                    </tbody>
                 </table>
              
                
                 </React.Fragment>
            }
           
                
        </React.Fragment>

        );

    }
    
    }

export default ListadoUsuarios;