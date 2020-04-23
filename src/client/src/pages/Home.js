import React from 'react';
import ImporteTotal from '../components/ImporteTotal';
import TotalUsuarios from '../components/TotalUsuarios';
import Categories from '../components/Categories';
import ListadoUsuarios from '../components/ListadoUsuarios';
import Metric from  '../components/Metric';


function Home (){

    return (

        <div className="container-fluid">

    
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                          <h1 className="h3 mb-0 text-gray-800"> Dashboard Administrador</h1>
                        </div>

                        <div className="row">

                          
                          <Metric 
                            title="Stock total de productos"
                            value ="535"
                            icon="fa-clipboard-list"
                            border="border-left-primary"
                          />

                          <ImporteTotal 
                            title="Costo total de stock"
                            value ="535"
                            />

                          <TotalUsuarios 
                            title="Usuarios registrados"
                            value ="535"
                            />

                        <ListadoUsuarios></ListadoUsuarios>

                        </div>

                        <div className="row">
                          <div className="col-lg-6 mb-4">
                            <div className="card shadow mb-4">
                              <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Last product in Data Dase</h6>
                              </div>
                              <div className="card-body">
                                <div className="text-center">
                                  <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem"}} src="assets/images/product_dummy.svg" alt="producto" />
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa exercitationem ratione?</p>
                                <a target="_blank" rel="nofollow" href="/">View product detail</a>
                              </div>
                            </div>
                          </div>

                          <Categories></Categories>
                        </div>
                        </div>
    );
}

export default Home;