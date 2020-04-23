import React from 'react';

// Componentes
import Sidebar from  './components/Sidebar';
import ListadoUsuarios from './components/ListadoUsuarios';
import Navbar from  './components/Navbar';
import StockTotal from  './components/StockTotal';
import ImporteTotal from './components/ImporteTotal';
import TotalUsuarios from './components/TotalUsuarios';
import Categories from './components/Categories';
import UltimoIngresado from './components/UltimoIngresado';
import InfoProductos from './components/InfoProductos';


//App es un componente 
// la inicial va en mayuscula inclusive el archivo
//
function App() {
  return (

    // {} es la forma de imprimir de los componentes e incluir logica de JS
    // las etiquetas se le aplican las barras  <img />
    // style se utiliza un objeto literal  style = {{ width: "25em"}}
    
    <div id="wrapper">

      <Sidebar />
   
    <div id="content-wrapper" className="d-flex flex-column">

  
      <div id="content">

    
        <Navbar />

        <div className="container-fluid">

    
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800"> Dashboard Administrador</h1>
          </div>

          <div className="row">

          
         
         <ListadoUsuarios></ListadoUsuarios>
         
          </div>

          <div className="row">
            <UltimoIngresado></UltimoIngresado>
            <Categories></Categories>
          </div>
        </div>
      
      </div>

      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Dashboard 2020</span>
          </div>
        </div>
      </footer>
  

    </div>


  </div>



  );
}

export default App;
