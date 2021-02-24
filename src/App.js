import React, { useState } from 'react';
import styled from 'styled-components';
import {NavLink, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import Store from './components/Store';
import Error404 from './components/Error404';
import Cart from './components/Cart';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/tiendaReducer';

const App = () => {

  const agregarProductoCarrito = (idProducto, nombre) => {
    // Si el carrito no tiene elementos entonces agregamos uno.
    if(carrito.length === 0){
      cambiarCarrito([{id: idProducto, nombre: nombre, cantidad: 1}]);
    } else {
      // De otra foma tenemos que revisar que el carrito no tenga ya el producto que queremos agregar.
      // Si ya lo tiene entonces queremos actualizar su valor.
      // Si no tiene el producto entonces lo agregamos.

      // Para poder editar el arreglo tenemos que clonarlo.
      const nuevoCarrito = [...carrito];

       // Comprobamos si el carrito ya tiene el ID del producto a agregar.
      const enCarrito = nuevoCarrito.filter((productoCarrito) => {
        return productoCarrito.id === idProducto
      }).length > 0;

      // Si ya tiene el producto entonces lo tenemos que actualizar.
      if(enCarrito){
        // Para ello tenemos que buscarlo, obtener su posicion en el arreglo.
        // Y en base a su posicion ya actualizamos el valor.
        nuevoCarrito.forEach((productoCarrito, index) => {
            if(productoCarrito.id === idProducto){
                const cantidad = nuevoCarrito[index].cantidad;
                nuevoCarrito[index] = {
                    id: idProducto, 
                    nombre: nombre, 
                    cantidad: cantidad + 1
                }
            }
        });
        // De otra forma entonces agregamos el producto al arreglo.
      } else {
        nuevoCarrito.push(
            {
                id: idProducto,
                nombre: nombre,
                cantidad: 1
            }
        );
      }

      // Por ultimo actualizamos el carrito.
      cambiarCarrito(nuevoCarrito);
    }
  }
  //reducer es una funcion que edita el estado global
  const store = createStore(reducer);

  return ( 
    <Provider store={store}>
      <Contenedor>
        <Menu>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/blog'>Blog</NavLink>
          <NavLink to='/store'>Store</NavLink>
        </Menu>
        <main>
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/blog' component={Blog} />
            <Route path='/store' component={Store} />
            <Route component={Error404} />
          </Switch>
        </main>
        <aside>
          <Cart />
        </aside>
      </Contenedor>
    </Provider>
   );
}
const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;
export default App;
