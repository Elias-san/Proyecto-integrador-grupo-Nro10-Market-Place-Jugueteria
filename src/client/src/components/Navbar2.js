
import React from 'react';

function Navbar (){

  return (

    <nav className="navbar navbar-expand-lg navbar-dark"  style={{background:"#00a8ff"}}>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
     
        <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/producto">Producto</Link>
              </li>
              <li>
                <Link to="/usuario">Usuario</Link>
              </li>
        </ul>
     
    </div>
</nav>

);
       
}

export default Navbar;